# Boilerplate : Void Like Web App

VoidZero 社提供の Void や Vite+ で使われているエコシステムを採用しつつ、Cloudflare との密結合を緩和し可搬性を考慮したプロジェクト。

- Hono による API バックエンド、React Router (Data Mode) による SPA フロントエンドをサンプルプロジェクトとして提供する
- Void は Cloudflare Workers へのデプロイを前提としたツールチェーンとなっているため、好みに応じて Cloudflare との依存を剥がしやすい構成とする
    - Cloudflare Workers へのデプロイは `void deploy` のような密結合したコマンドを使わず、`cf` CLI (もしくは Wrangler CLI) を別途用いるように設定しておく
    - Cloudflare を前提とする `void/db` のようなモジュールをコード内であえて使用しない
- Vite+ はマシングローバルに `vp` コマンドをインストールする必要があるため、プロジェクトディレクトリ内に閉じて実行できる、ホスト環境を汚さない構成とする
    - Vite+ が統合している各ツールを個別に npm パッケージとしてローカルインストールし、Vite+ 相当の構成を再現する
    - Vite+ は `vite.config.ts` に Oxfmt・Oxlint の設定などをまとめられるが、個別インストール時はその恩恵を受けられない点に留意
- `cf` CLI や Wrangler CLI を経由せず、Miniflare を用いてローカルに常時起動するサーバを立てられるオプションを用意する
    - Miniflare でローカル起動した場合、Cloudflare Workers 本番環境に存在する「CPU 時間制限」等を回避できるため、トンネルを用意して通常サーバとして外部公開できる可能性を例示する


## npm-run-scripts

```bash
# 依存パッケージをインストールする
$ npm install

# 開発サーバを起動する
$ npm run dev

# オートフォーマッタを実行する
$ npm run fmt
# オートフォーマッタを Dry-Run 実行する
$ npm run fmt:check

# Linter を実行し自動修正する
$ npm run lint
# Linter を Dry-Run 実行する (自動修正を行わない)
$ npm run lint:check

# 必要な型定義ファイルを生成した上で型チェックを行う
$ npm run check

# ユニットテストを1回実行しカバレッジレポートを出力する
$ npm run test
# ユニットテストを Watch モードで実行する
$ npm run test:watch
# ベンチマークテストを実行する
$ npm run test:bench

# 型定義ファイル生成・型チェックの後、ビルドする
$ npm run build

# ビルドした資材を利用してプレビューサーバを起動する
$ npm run preview

# ビルドした資材を利用して Cloudflare Workers にデプロイする
# - このコマンドはビルドをしない・事前に Production モード以外を指定してビルドしていた場合を弾くため `--mode` 指定を念のため入れてある
# - 事前に `$ cf auth login` でログインが必要
$ npm run deploy

# ビルドした資材を利用して Miniflare サーバをローカル起動する
$ npm run serve
```

- `$ npm run preview` は Node.js 上で動作する Vite のプレビューサーバであるため、比較してオーバーヘッドが大きく環境再現性が低い
- `$ npm run serve` は Miniflare (`workerd`) を利用して動作するため、オーバーヘッドがより少なく環境再現性がより高い


## Dependencies

- `hono` : サーバで利用・API サーバ
- `ky` : クライアントで利用・Fetch ライブラリ
- `react` : クライアントで利用・React
- `react-dom` : クライアントで利用・React
- `react-router` : クライアントで利用・React Router
    - SPA モード・Data Mode で利用している (Framework Mode は Vite Cloudflare プラグインとの相性が悪かったため不採用)
- `zod` : サーバ・クライアントで共用・バリデーションスキーマと型定義
- `zustand` : クライアントで利用・Store


## Dev Dependencies

- `@cloudflare/build-output-utils` : Miniflare 起動用に利用・`.cloudflare/output/` 配下にビルドされた資材のパスを参照する
- `@cloudflare/vite-plugin` : Vite プラグイン・Cloudflare Workers ランタイムとの統合
- `@tailwindcss/vite` : Vite プラグイン・TailwindCSS を処理する
- `@types/node` : 型定義・Node.js
- `@types/react` : 型定義・React
- `@types/react-dom` : 型定義・React
- `@vitejs/plugin-react` : Vite プラグイン・React (React Router) を実行する
- `@vitest/coverage-v8` : Vitest で利用・カバレッジレポート出力
- `cf` : Cloudflare CLI・型定義ファイル出力とデプロイ時に利用
- `daisyui` : クライアントで利用・TailwindCSS をベースとしたコンポーネントライブラリ
- `happy-dom` : Vitest におけるクライアントのユニットテストで利用・`jsdom` より高速
- `miniflare` : Miniflare
- `oxfmt` : Formatter
- `oxlint` : Linter
- `tailwindcss` : クライアントで利用・CSS ライブラリ
- `typescript` : TypeScript
- `vite` : Vite
- `vitest` : ユニットテストツール
- `wrangler` : `cf` が合わせて自動的にインストールする Wrangler CLI


## 設定ファイル

- `cloudflare.config.ts` : Wrangler CLI における `wrangler.jsonc` 相当の設定ファイル・Cloudflare Workers 設定を定義する
- `oxfmt.config.ts` : Formatter の設定
- `oxlint.config.ts` : Linter の設定
- `tsconfig.json` : TypeScript の解釈のための設定
- `vite.config.ts` : Vite の設定
- `vitest.config.ts` : Vitest の設定
- `vitest.setup.ts` : Vitest がクライアントをテストする際のセットアップファイル


## 主な構成

- `shared/` : サーバ・クライアントで共用するコード (Zod や型定義・定数など)
- `server/` : サーバのコード (Hono メイン)
    - `server/index.ts` : `cloudflare.config.ts` でエントリポイントを指定するため `export default` が必須
    - `server/types/hono-bindings.ts` : Hono の Context 型定義・`.clouflare/types/` に出力される型定義を合成することで D1 へのアクセスなどを実現している
- `index.html` : クライアントにおける HTML
    - Vite のデフォルト設定に対して Vite Cloudflare プラグインが密結合しているためプロジェクトルートに置く必要がある・`client/index.html` といったパスにファイルを配置するのが困難だった
- `client/` : クライアントのコード (React Router メイン)
    - `client/index.tsx` : `index.html` から参照するエントリポイント
    - `client/routes.tsx` : React Router のルーティング定義
    - `client/root.tsx` : ページ全体を構成するコンポーネント
    - `client/styles.css` : CSS ファイル
    - `client/public/` : 静的ファイル・`vite.config.ts` の設定により `client/` 配下に配置している

### その他のディレクトリ

- `scripts/` : Miniflare サーバを起動するスクリプト置き場
- `.vscode/` : VSCode 設定
- Git 管理対象外
    - `.cloudflare/` : `cf` コマンドの結果出力先・型定義ファイルやビルド資材、開発サーバのデータ保持に利用される
    - `.miniflare/` : Miniflare サーバ起動時のデータ保持
    - `.vitest/` : Vitest のカバレッジレポート出力先
    - `.wrangler/` : `cf` コマンドが内部的に Wrangler CLI を併用しているため生成される


## その他

- `NOTE :` コメントは設計や実装意図を特に詳しく示している箇所に記載アリ
- `Example :` は完全なサンプルコードを示すモノとして記載アリ・`Example`・`Examples` といった文言もサンプルとして確認のこと
- `【Value】` のように墨付きカッコでサンプルのプレースホルダを記した箇所もアリ・特に `cloudflare.config.ts` 内の設定はアカウント環境に合わせて要調整
- Oxfmt・Oxlint・TSConfig のルールは同様のコードを対象にするルールが競合する場合があるため、カスタマイズ時は「Formatter が設定を持っていたら」「Linter で競合するモノは無効化」「TSConfig は型チェック時に実行されるため Format・Lint 実行後に必要な型周りのチェックに用途を限定する」などといった使い分け方針を決めておくと良さそう


## Links

- [Neo's World](https://neos21.net/)
