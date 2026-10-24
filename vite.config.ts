import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** Vite 設定 : 開発サーバ・ビルド・プレビューサーバ */
export default defineConfig({
  // プロジェクトルート直下に `public/` を作らず `client/` 配下に作るようにする
  publicDir: 'client/public',
  plugins: [
    // Cloudflare Workers ランタイムを統合するプラグイン
    // - プラグイン内部の `forceBuildOutputDirs()` が出力先ディレクトリを `.cloudflare/output/` 配下に決めている・コレにより Vite デフォルトの `dist/` には出力されない
    // - プロジェクト直下の `index.html` は、本 Vite 設定内の `root` 指定と、このプラグインが扱う `.cloudflare/output/` ディレクトリの基準が紐付いていることから移動困難
    cloudflare({ remoteBindings: false }),
    // React プラグイン : React Router を Data Mode の SPA として出力するにはコレで良い
    react(),
    // TailwindCSS プラグイン
    tailwindcss()
  ],
  // ページコンポーネント含めて確実に命名ルールを適用するため `environments.client` 階層を付ける
  environments: {
    client: {
      build: {
        rollupOptions: {
          output: {
            entryFileNames: 'assets/entry-[hash].js',
            chunkFileNames: 'assets/chunk-[hash].js',
            assetFileNames: 'assets/asset-[hash].[ext]'
          }
        }
      }
    }
  }
});
