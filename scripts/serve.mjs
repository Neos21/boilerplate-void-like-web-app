import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { readBuildOutput } from '@cloudflare/build-output-utils';
import { Miniflare } from 'miniflare';

// ビルドした資材を参照して Miniflare サーバを起動する

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const { values } = parseArgs({
  options: {
    host: { type: 'string', default: '127.0.0.1' },
    port: { type: 'string', default: '8787' }
  }
});
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('`--port` は 1〜65535 の整数で指定してください');
}

const { workers } = await readBuildOutput(projectRoot).catch(error => {
  throw new Error('ビルド成果物を読み込めません・先に `$ npm run build` を実行してください', { cause: error });
});

// Miniflare の `manifest` に各モジュールの内容も渡すことで、チャンクや WASM も読み込める形にする
const workerOptions = await Promise.all(
  Object.values(workers).map(async ({ config, bundleDir, assetsDir }) => {
    if (!bundleDir || !config.manifest) {
      throw new Error('Hono Worker のビルド成果物がありません・先に `$ npm run build` を実行してください');
    }
    const { mainModule, modules } = config.manifest;
    const contents = await Promise.all(
      Object.entries(modules).map(async ([name, { type }]) => {
        const buffer = await readFile(path.resolve(bundleDir, name));
        return [name, { type, contents: type === 'wasm' || type === 'data' ? buffer : buffer.toString() }];
      })
    );

    // 現在使用する `ASSETS`・`D1` とインライン値だけを許可し、リモート接続が必要な設定を黙って使わない
    const env = Object.fromEntries(
      Object.entries(config.env ?? {}).map(([name, binding]) => {
        if (!['assets', 'd1', 'text', 'json'].includes(binding.type)) {
          throw new Error(`未対応のバインディングです : ${name} (${binding.type})`);
        }
        return [name, binding.type === 'd1' ? { ...binding, dev: { ...binding.dev, remote: false } } : binding];
      })
    );

    return {
      config: {
        ...config,
        env,
        manifest: { mainModule, modulesRoot: bundleDir, modules: Object.fromEntries(contents) },
        assets: assetsDir ? { ...config.assets, directory: assetsDir, hasUserWorker: true } : undefined
      }
    };
  })
);

const miniflare = new Miniflare({
  host: values.host,
  port,
  cf: false,
  telemetry: { enabled: false },
  resourcePersistencePath: path.resolve(projectRoot, '.miniflare'),
  workers: workerOptions
});

// `Ctrl+C`・コンテナ終了時に `workerd` とストレージを閉じる
const stop = async () => {
  await miniflare.dispose();
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
try {
  const url = await miniflare.ready;
  console.log(`Miniflare : ${url.href}`);
} catch (error) {
  await miniflare.dispose();
  throw error;
}
