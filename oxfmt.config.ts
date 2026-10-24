import { defineConfig } from 'oxfmt';

/** Oxfmt 設定 https://oxc.rs/docs/guide/usage/formatter/config */
export default defineConfig({
  // 引数が1つのアロー関数に括弧を付けるか否か : 付けない (`avoid`)
  arrowParens: 'avoid',
  // 拡張子以外でファイルの言語を指定するための対応表
  associations: [],
  // 複数行タグの閉じ括弧 `>` を最後の属性と同じ行に置かない
  bracketSameLine: false,
  // オブジェクトの波括弧の内側にスペースを入れる
  bracketSpacing: true,
  // テンプレート文字列や Markdown 内コードなどの埋め込み言語も整形する
  embeddedLanguageFormatting: 'auto',
  // 改行コードを LF に統一する
  endOfLine: 'lf',
  // 改行する式の演算子を前の行の末尾に置く (`end`)
  experimentalOperatorPosition: 'end',
  // HTML 内のスペース・改行の取り扱い : `css` は CSS の `display` 値に基づいて判断する・`strict` はタグ周りの空白をできるだけ保持する・`ignore` はなるべく除去する方向で整形する
  htmlWhitespaceSensitivity: 'css',
  // 除外するディレクトリ・ファイル
  ignorePatterns: ['.cloudflare/**', '.wrangler/**', '.vitest/**', 'build/**', 'dist/**', 'README.md', 'TASKS.md'],
  // ファイル末尾に改行を付ける
  insertFinalNewline: true,
  // JSDoc のタグ名・説明文・折り返しの追加整形をしない
  jsdoc: false,
  // JSX の属性値はダブルクォートで囲む
  jsxSingleQuote: false,
  // 最初のプロパティ前に改行があるオブジェクトは複数行を維持する
  objectWrap: 'preserve',
  // ファイルごとに設定を上書きする定義
  overrides: [],
  // 折り返しの目安となる行幅 (日本語や構文により厳密な上限にはならない)
  printWidth: 200,
  // Markdown などの文章の既存の改行を維持する (`preserve`)
  proseWrap: 'preserve',
  // オブジェクトのプロパティ名は必要な場合だけ引用符で囲む ('as-needed`)
  quoteProps: 'as-needed',
  // 文末にセミコロンを付ける
  semi: true,
  // タグの属性を必ず1行1つにする制約は設けない
  singleAttributePerLine: false,
  // 通常の文字列はシングルクォートを使用する (`true`)
  singleQuote: true,
  // `import` 宣言を自動ソートする
  sortImports: true,
  // `package.json` のキー順を維持する (`false`)
  sortPackageJson: false,
  // TailwindCSS クラスを自動ソートする
  sortTailwindcss: true,
  // インデントを2スペースにする
  tabWidth: 2,
  // 配列・オブジェクト・引数などに末尾カンマを付けない (`none`)
  trailingComma: 'none',
  // インデントにタブ文字を使わない
  useTabs: false
});
