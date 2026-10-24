import { bindings, defineConfig } from 'cf/config';

/** Cloudflare Workers と統合するための設定 */
export default defineConfig({
  // アカウント ID
  accountId: '【Account ID】',
  worker: {
    // `https://【NAME】.【サブドメイン】.workers.dev` の `【NAME】` に相当する名前
    name: 'example',
    // ランタイム互換日付
    compatibilityDate: '2026-10-19',
    // Hono サーバのエントリポイント
    entrypoint: './server/index.ts',
    // 静的資産の出力ディレクトリは Cloudflare Vite プラグインが決めるため指定しない
    assets: {
      // 見つからない画面のパスには `index.html` を返し SPA として動かす
      notFoundHandling: 'single-page-application',
      // `/api` 配下に直アクセス可能にする (CORS 設定は別途必要)
      runWorkerFirst: ['/api/*']
    },
    // 環境変数設定
    env: {
      // Workers から `env.ASSETS.fetch()` で静的資産にアクセスできるようにする
      ASSETS: bindings.assets(),
      // D1 の名前
      DB: bindings.d1({
        name: '【example】',
        id: '【Database ID】',
        // 開発環境では本番 DB に接続しない
        dev: {
          remote: false
        }
      })
    },
    // `workers.dev` の URL を公開する
    workersDev: true,
    // プレビュー URL は公開しない
    previewUrls: false,
    // Workers のログ・トレースを有効にする
    observability: {
      enabled: true,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        invocationLogs: true,
        persist: true
      },
      traces: {
        enabled: true,
        headSamplingRate: 1,
        persist: true
      }
    },
    // バックエンドへの往復時間を短縮するよう Worker の実行場所を最適化する
    placement: {
      mode: 'smart'
    }
  }
});
