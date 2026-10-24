import { defineConfig } from 'oxlint';

/**
 * Oxlint 設定 https://oxc.rs/docs/guide/usage/linter/config
 *
 * - `plugins`・`categories` で大まかなルールがデフォルトで有効化される
 * - 本ファイルには参考のため現状存在する全 `rules` を列挙している
 * - `rules` の定義があると `plugins`・`categories` によるデフォルトの挙動を上書きするので、対応するルール定義を調整・記述を削除するなどして対応すること
 */
export default defineConfig({
  // オプション設定
  options: {
    // エラーを検知した場合は終了コードを設定する
    denyWarnings: true
  },
  // 組み込みのプラグイン
  plugins: [
    // `import`・`export`・モジュール依存のルール
    'import',
    // JSDoc コメントのルール
    'jsdoc',
    // Vitest テストのルール
    'vitest',
    // JSX のアクセシビリティのルール
    //'jsx-a11y',
    // React 描画時の参照生成などの性能に関するルール
    'react-perf',
    // Promise の使用方法に関するルール
    'promise',
    // Node.js 固有のルール
    'node',
    // JavaScript の基本ルール
    'eslint',
    // React・JSX・Hooks・React Compiler のルール
    'react',
    // JavaScript の安全性・簡潔さ・API 選択のルール
    'unicorn',
    // TypeScript の構文・型に関するルール
    'typescript',
    // Oxc 独自の不具合検出・最適化のルール
    'oxc'
  ],
  // カテゴリ : `all` は CLI 用の一括指定
  categories: {
    // 明らかな誤り・無意味な処理の検査
    correctness: 'error',
    // 誤りである可能性が高い処理の検査
    suspicious: 'warn',
    // 厳格で誤検出の可能性もある検査
    pedantic: 'off',
    // 性能を改善できる処理
    perf: 'warn',
    // 慣用的な書き方や表記の統一
    style: 'warn',
    // 特定の言語機能・API の使用制限
    restriction: 'warn',
    // 開発中の新しいルール
    nursery: 'off'
  },
  // 除外するディレクトリ・ファイル
  ignorePatterns: ['.cloudflare/**', '.wrangler/**', '.vitest/**', 'build/**', 'dist/**', 'README.md', 'TASKS.md'],
  // 個別ルールの指定 : プラグインごとに並べてあり、カテゴリと型情報の要否をコメントしてある
  // - `rules` の指定は `categories` より優先される
  // - 「型情報が必要」のルールを実行するには `oxlint-tsgolint` の導入と `type-aware` の有効化が別途必要・これらは `error` と記載していても現状では実行されない
  rules: {
    // `eslint` のルール

    // Getter と Setter の対応を検査する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/accessor-pairs.html
    'accessor-pairs': 'off',
    // 配列メソッドのコールバックに必要な戻り値を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/array-callback-return.html
    'array-callback-return': 'off',
    // アロー関数本体の波括弧の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/arrow-body-style.html
    'arrow-body-style': 'off',
    // `var` 宣言の変数も宣言されたブロック内だけで使用させる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/block-scoped-var.html
    'block-scoped-var': 'warn',
    // コメントの先頭の大文字・小文字を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/capitalized-comments.html
    'capitalized-comments': 'off',
    // `this` を使わないインスタンスメソッドを検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/class-methods-use-this.html
    'class-methods-use-this': 'warn',
    // 関数の循環的複雑度に上限を設ける (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/complexity.html
    complexity: 'warn',
    // 派生クラスで必要な `super()` 呼び出しを検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/constructor-super.html
    'constructor-super': 'error',
    // 制御文の本体を波括弧で囲む方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/curly.html
    curly: 'off',
    // `switch` 文に `default` 節を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case.html
    'default-case': 'warn',
    // `switch` の `default` 節を最後に置く (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-case-last.html
    'default-case-last': 'warn',
    // デフォルト引数を通常の引数より後ろに置く (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/default-param-last.html
    'default-param-last': 'warn',
    // 厳密等価比較を使う (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/eqeqeq.html
    eqeqeq: 'off',
    // `for` 文の更新方向が終了条件に向かっているか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/for-direction.html
    'for-direction': 'error',
    // 関数名と代入先の名前を一致させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-name-matching.html
    'func-name-matching': 'warn',
    // 関数式に名前を付ける方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-names.html
    'func-names': 'warn',
    // 関数宣言と関数式の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/func-style.html
    // - 関数宣言より関数式を使う・名前付き `export` も対象にし、変数への関数型注釈を許可する
    // - `export default function`・オーバーロードなど本体のない型宣言はこのルールの対象外
    // - 通常の `function` 式も許可される・コールバックは `prefer-arrow-callback`、React は専用ルールで補う
    'func-style': ['error', 'expression', { allowTypeAnnotation: true, overrides: { namedExports: 'expression' } }],
    // Getter に値を返す処理を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/getter-return.html
    'getter-return': 'error',
    // 同じプロパティの Getter と Setter を隣接させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/grouped-accessor-pairs.html
    'grouped-accessor-pairs': 'warn',
    // `for in` で継承プロパティを除外する検査を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/guard-for-in.html
    'guard-for-in': 'warn',
    // 指定した名前の識別子を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-denylist.html
    'id-denylist': 'warn',
    // 識別子の長さを制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-length.html
    'id-length': 'off',
    // 識別子の名前を正規表現に一致させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/id-match.html
    'id-match': 'warn',
    // 変数宣言時の初期化方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/init-declarations.html
    'init-declarations': 'off',
    // 論理代入演算子 `&&=`・`||=`・`??=` の使用方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/logical-assignment-operators.html
    'logical-assignment-operators': 'warn',
    // 1ファイル内のクラス数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-classes-per-file.html
    'max-classes-per-file': 'off',
    // ブロックのネストの深さを制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-depth.html
    'max-depth': 'off',
    // ファイルの行数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines.html
    'max-lines': 'off',
    // 関数の行数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-lines-per-function.html
    'max-lines-per-function': 'off',
    // コールバックのネスト数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-nested-callbacks.html
    'max-nested-callbacks': 'off',
    // 関数の引数の数を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-params.html
    'max-params': 'off',
    // 関数内の文の数を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/max-statements.html
    'max-statements': 'off',
    // コンストラクタと通常関数の名前の大文字・小文字を検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/new-cap.html
    'new-cap': 'warn',
    // `alert`・`confirm`・`prompt` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-alert.html
    'no-alert': 'warn',
    // 不要な Array コンストラクタの使用を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-array-constructor.html
    'no-array-constructor': 'off',
    // Promise の Executor を `async` 関数にすることを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-async-promise-executor.html
    'no-async-promise-executor': 'error',
    // ループ内の `await` を禁止する (perf) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-await-in-loop.html
    'no-await-in-loop': 'off',
    // ビット演算子の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-bitwise.html
    'no-bitwise': 'warn',
    // `arguments.caller`・`arguments.callee` の使用を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-caller.html
    'no-caller': 'error',
    // `case` 節直下のブロックで囲まれていない字句宣言を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-case-declarations.html
    'no-case-declarations': 'off',
    // クラス宣言の識別子への再代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-class-assign.html
    'no-class-assign': 'error',
    // `-0` との通常の等価比較を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-compare-neg-zero.html
    'no-compare-neg-zero': 'error',
    // 条件式への代入式の混入を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-cond-assign.html
    'no-cond-assign': 'error',
    // `console` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-console.html
    'no-console': 'off',
    // `const` 変数への再代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-const-assign.html
    'no-const-assign': 'error',
    // 結果が常に一定になる二項演算を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-binary-expression.html
    'no-constant-binary-expression': 'error',
    // 常に一定の値になる条件式を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constant-condition.html
    'no-constant-condition': 'error',
    // コンストラクタから値を返すことを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-constructor-return.html
    'no-constructor-return': 'off',
    // `continue` 文の使用を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-continue.html
    'no-continue': 'warn',
    // 正規表現内の制御文字を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-control-regex.html
    'no-control-regex': 'error',
    // `debugger` 文を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger.html
    'no-debugger': 'error',
    // 変数への `delete` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-delete-var.html
    'no-delete-var': 'error',
    // 除算と紛らわしい正規表現の書き方を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-div-regex.html
    'no-div-regex': 'warn',
    // クラスメンバーの重複定義を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-class-members.html
    'no-dupe-class-members': 'error',
    // `if`・`else-if` の重複した条件を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-else-if.html
    'no-dupe-else-if': 'error',
    // オブジェクトリテラルの重複キーを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-dupe-keys.html
    'no-dupe-keys': 'error',
    // `switch` の重複した `case` 条件を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-case.html
    'no-duplicate-case': 'error',
    // 同じモジュールからの `import` をまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-duplicate-imports.html
    'no-duplicate-imports': 'warn',
    // `return` 後の不要な `else` を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-else-return.html
    'no-else-return': 'off',
    // 空のブロックを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty.html
    'no-empty': 'warn',
    // 正規表現の空の文字クラスを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-character-class.html
    'no-empty-character-class': 'error',
    // 空の関数を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-function.html
    'no-empty-function': 'warn',
    // 空の分割代入パターンを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-pattern.html
    'no-empty-pattern': 'error',
    // 空のクラス静的初期化ブロックを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-empty-static-block.html
    'no-empty-static-block': 'error',
    // `null` との `==`・`!=` 比較を禁止する場合は指定する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eq-null.html
    'no-eq-null': 'off',
    // `eval` の使用を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-eval.html
    'no-eval': 'error',
    // `catch` した例外変数への再代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ex-assign.html
    'no-ex-assign': 'error',
    // 組み込みオブジェクトのプロトタイプの拡張を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extend-native.html
    'no-extend-native': 'warn',
    // 不要な `bind()` を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-bind.html
    'no-extra-bind': 'warn',
    // 不要な真偽値への変換を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-boolean-cast.html
    'no-extra-boolean-cast': 'error',
    // 不要なラベルを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-extra-label.html
    'no-extra-label': 'warn',
    // `switch` の意図しない次の `case` への通過を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-fallthrough.html
    'no-fallthrough': 'off',
    // 関数宣言の識別子への再代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-func-assign.html
    'no-func-assign': 'error',
    // 読み取り専用のグローバル変数への代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-global-assign.html
    'no-global-assign': 'error',
    // 短縮記法による暗黙の型変換を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-coercion.html
    'no-implicit-coercion': 'warn',
    // 意図しないグローバル変数・関数の宣言を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implicit-globals.html
    'no-implicit-globals': 'warn',
    // タイマー関数などへの文字列コードの受け渡しを禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-implied-eval.html
    'no-implied-eval': 'warn',
    // `import` した変数への再代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-import-assign.html
    'no-import-assign': 'error',
    // コードと同じ行の後方コメントを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inline-comments.html
    'no-inline-comments': 'off',
    // 入れ子のブロック内の関数・変数宣言を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-inner-declarations.html
    'no-inner-declarations': 'off',
    // RegExp コンストラクタの不正な正規表現を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-invalid-regexp.html
    'no-invalid-regexp': 'error',
    // 通常のスペースなどと紛らわしい空白文字を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-irregular-whitespace.html
    'no-irregular-whitespace': 'error',
    // 非標準の `__iterator__` プロパティを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-iterator.html
    'no-iterator': 'error',
    // 変数名と同じラベルを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-label-var.html
    'no-label-var': 'warn',
    // ラベル付き文を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-labels.html
    'no-labels': 'warn',
    // 不要な単独のブロックを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lone-blocks.html
    'no-lone-blocks': 'warn',
    // `else` の中に `if` だけを置く書き方を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-lonely-if.html
    'no-lonely-if': 'off',
    // ループで変化する変数を参照する関数宣言を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loop-func.html
    'no-loop-func': 'off',
    // 数値リテラルの精度落ちを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-loss-of-precision.html
    'no-loss-of-precision': 'error',
    // 意味が名前で説明されない数値リテラルを制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-magic-numbers.html
    'no-magic-numbers': 'off',
    // 複数コードポイントの文字を誤解させる正規表現の文字クラスを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-misleading-character-class.html
    'no-misleading-character-class': 'error',
    // 連鎖した代入を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-assign.html
    'no-multi-assign': 'warn',
    // バックスラッシュで改行を継続する文字列を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-multi-str.html
    'no-multi-str': 'warn',
    // `else` を伴う条件分岐などの否定条件を避けさせる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-negated-condition.html
    'no-negated-condition': 'off',
    // 入れ子の三項演算子を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nested-ternary.html
    'no-nested-ternary': 'warn',
    // 生成結果を使用しない `new` 式を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new.html
    'no-new': 'warn',
    // Function コンストラクタによるコード生成を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-func.html
    'no-new-func': 'warn',
    // コンストラクタではない組み込み関数への `new` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-native-nonconstructor.html
    'no-new-native-nonconstructor': 'error',
    // String・Number・Boolean のラッパーオブジェクト生成を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-new-wrappers.html
    'no-new-wrappers': 'off',
    // 文字列内の非8進数の10進エスケープを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-nonoctal-decimal-escape.html
    'no-nonoctal-decimal-escape': 'error',
    // Math・JSON など呼び出せない組み込みオブジェクトの呼び出しを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-obj-calls.html
    'no-obj-calls': 'error',
    // Object コンストラクタによる不要なオブジェクト生成を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-object-constructor.html
    'no-object-constructor': 'off',
    // 関数引数への再代入を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-param-reassign.html
    'no-param-reassign': 'warn',
    // インクリメント・デクリメント演算子を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-plusplus.html
    'no-plusplus': 'warn',
    // Promise の Executor から値を返すことを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-promise-executor-return.html
    'no-promise-executor-return': 'off',
    // 非推奨の `__proto__` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-proto.html
    'no-proto': 'warn',
    // `hasOwnProperty` などを対象オブジェクトから直接呼び出すことを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-prototype-builtins.html
    'no-prototype-builtins': 'off',
    // 同じスコープでの変数の再宣言を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-redeclare.html
    'no-redeclare': 'off',
    // 正規表現内の連続したスペースを検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-regex-spaces.html
    'no-regex-spaces': 'warn',
    // 指定した名前の `export` を禁止する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-exports.html
    'no-restricted-exports': 'off',
    // 指定したグローバル変数を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-globals.html
    'no-restricted-globals': 'warn',
    // 指定したモジュールや名前の `import` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-imports.html
    'no-restricted-imports': 'warn',
    // 指定したオブジェクトのプロパティへのアクセスを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-restricted-properties.html
    'no-restricted-properties': 'warn',
    // `return` 内の代入を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-return-assign.html
    'no-return-assign': 'warn',
    // `javascript:` URL を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-script-url.html
    'no-script-url': 'warn',
    // 自分自身への代入を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-assign.html
    'no-self-assign': 'error',
    // 同じ値同士の比較を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-self-compare.html
    'no-self-compare': 'off',
    // カンマ演算子の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sequences.html
    'no-sequences': 'warn',
    // Setter から値を返すことを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-setter-return.html
    'no-setter-return': 'error',
    // 外側のスコープと同じ名前の変数の宣言を制限する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow.html
    'no-shadow': 'off',
    // `undefined` などの予約的な名前を隠す宣言を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-shadow-restricted-names.html
    'no-shadow-restricted-names': 'error',
    // 要素が抜けた疎な配列リテラルを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-sparse-arrays.html
    'no-sparse-arrays': 'error',
    // 通常の文字列にテンプレート展開の記法が混入していないか検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-template-curly-in-string.html
    'no-template-curly-in-string': 'warn',
    // 三項演算子を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-ternary.html
    'no-ternary': 'off',
    // `super()` より前の `this`・`super` の参照を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-this-before-super.html
    'no-this-before-super': 'error',
    // Error 以外のリテラルなどを `throw` することを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-throw-literal.html
    'no-throw-literal': 'off',
    // 一度も値が代入されない変数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unassigned-vars.html
    'no-unassigned-vars': 'error',
    // 未定義の識別子への参照を検出する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undef.html
    'no-undef': 'off',
    // `undefined` 識別子の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-undefined.html
    'no-undefined': 'off',
    // 識別子の先頭・末尾のアンダースコアを制限する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-underscore-dangle.html
    'no-underscore-dangle': 'warn',
    // 自動セミコロン挿入により意図が変わる改行を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unexpected-multiline.html
    'no-unexpected-multiline': 'warn',
    // ループ内で更新されない終了条件を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unmodified-loop-condition.html
    'no-unmodified-loop-condition': 'warn',
    // 真偽値や論理式で置き換えられる三項演算を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unneeded-ternary.html
    'no-unneeded-ternary': 'warn',
    // `return`・`throw` などの後の到達不能コードを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable.html
    'no-unreachable': 'error',
    // 1回しか実行されないループを検出する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unreachable-loop.html
    'no-unreachable-loop': 'off',
    // `finally` からの `return`・`throw` などによる制御の上書きを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-finally.html
    'no-unsafe-finally': 'error',
    // `in`・`instanceof` などへの誤った否定演算を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-negation.html
    'no-unsafe-negation': 'error',
    // `undefined` になり得るオプショナルチェーンの危険な使用を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unsafe-optional-chaining.html
    'no-unsafe-optional-chaining': 'error',
    // 値を使用せず副作用もない式を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-expressions.html
    'no-unused-expressions': 'error',
    // 使用されないラベルを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-labels.html
    'no-unused-labels': 'error',
    // 使用されないクラスの `private` メンバーを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-private-class-members.html
    'no-unused-private-class-members': 'error',
    // 使用されない変数・引数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-unused-vars.html
    'no-unused-vars': 'error',
    // 宣言より前の識別子の使用を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-use-before-define.html
    'no-use-before-define': 'warn',
    // 後続で使用されない代入を検出する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-assignment.html
    'no-useless-assignment': 'off',
    // 必ず空文字列に一致するなど無意味な正規表現の後方参照を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-backreference.html
    'no-useless-backreference': 'error',
    // 直接呼び出しで代替できる `call`・`apply` を禁止する (perf) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-call.html
    'no-useless-call': 'warn',
    // 捕捉した例外をそのまま投げ直すだけの `catch` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-catch.html
    'no-useless-catch': 'error',
    // 不要な計算プロパティ名を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-computed-key.html
    'no-useless-computed-key': 'warn',
    // 静的な文字列同士の不要な連結を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-concat.html
    'no-useless-concat': 'warn',
    // 省略できるコンストラクタを禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-constructor.html
    'no-useless-constructor': 'warn',
    // 不要なエスケープを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-escape.html
    'no-useless-escape': 'error',
    // 名前を変更しない `import`・`export`・分割代入の別名指定を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-rename.html
    'no-useless-rename': 'error',
    // 不要な `return` 文を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-useless-return.html
    'no-useless-return': 'off',
    // `var` を禁止し `let`・`const` を使わせる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-var.html
    'no-var': 'error',
    // `void` 演算子を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-void.html
    'no-void': 'warn',
    // 指定した警告コメントを検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-warning-comments.html
    'no-warning-comments': 'off',
    // `with` 文を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-with.html
    'no-with': 'error',
    // オブジェクトのプロパティ・メソッドの短縮記法を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/object-shorthand.html
    'object-shorthand': 'warn',
    // 1つの宣言文にまとめる変数の方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/one-var.html
    'one-var': 'off',
    // 複合代入演算子の使用方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/operator-assignment.html
    'operator-assignment': 'warn',
    // コールバックにアロー関数を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-arrow-callback.html
    'prefer-arrow-callback': 'error',
    // 再代入しない変数を `const` にさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-const.html
    'prefer-const': 'error',
    // 配列・オブジェクトの分割代入を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-destructuring.html
    'prefer-destructuring': 'off',
    // `Math.pow()` より `**` 演算子を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-exponentiation-operator.html
    'prefer-exponentiation-operator': 'warn',
    // 正規表現のキャプチャに名前を付けさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-named-capture-group.html
    'prefer-named-capture-group': 'warn',
    // `parseInt()` より基数付き数値リテラルを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-numeric-literals.html
    'prefer-numeric-literals': 'warn',
    // プロトタイプ経由の検査より `Object.hasOwn()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-has-own.html
    'prefer-object-has-own': 'warn',
    // `Object.assign()` よりオブジェクトのスプレッドを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-object-spread.html
    'prefer-object-spread': 'warn',
    // Promise の拒否理由に Error を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-promise-reject-errors.html
    'prefer-promise-reject-errors': 'off',
    // 静的な RegExp コンストラクタより正規表現リテラルを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-regex-literals.html
    'prefer-regex-literals': 'warn',
    // `arguments` より残余引数を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-rest-params.html
    'prefer-rest-params': 'warn',
    // `apply()` よりスプレッド構文を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-spread.html
    'prefer-spread': 'warn',
    // 文字列連結よりテンプレートリテラルを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/prefer-template.html
    'prefer-template': 'warn',
    // 例外を包み直すときに元の例外を `cause` として保持させる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/eslint/preserve-caught-error.html
    'preserve-caught-error': 'warn',
    // `parseInt()` の基数指定を検査する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/radix.html
    radix: 'off',
    // `await` を含まない `async` 関数を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-await.html
    'require-await': 'off',
    // 正規表現に Unicode モードを要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-unicode-regexp.html
    'require-unicode-regexp': 'off',
    // `yield` を含まないジェネレータ関数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/require-yield.html
    'require-yield': 'error',
    // `import` 宣言や指定子の並び順を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-imports.html
    // - Oxfmt の `sortImports: true` にソートを任せる
    // - このルールは構文・ローカル名で並べるため、モジュール名・グループで並べる Oxfmt と競合してしまう
    'sort-imports': 'off',
    // オブジェクトのキーの並び順を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-keys.html
    'sort-keys': 'off',
    // 変数宣言の名前の並び順を指定する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/sort-vars.html
    'sort-vars': 'off',
    // `Symbol()` に説明文字列を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/eslint/symbol-description.html
    'symbol-description': 'off',
    // ファイル先頭の BOM の有無を「BOM なし」に強制する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/eslint/unicode-bom.html
    'unicode-bom': ['error', 'never'],
    // `NaN` との比較ではなく `isNaN()` による検査を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/use-isnan.html
    'use-isnan': 'error',
    // `typeof` の比較先が有効な型名であることを検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/eslint/valid-typeof.html
    'valid-typeof': 'error',
    // `var` 宣言をスコープの先頭にまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/vars-on-top.html
    'vars-on-top': 'warn',
    // 比較式の定数を置く側を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/eslint/yoda.html
    yoda: 'warn',

    // `react` のルール

    // `button` 要素の `type` 属性を明示させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/button-has-type.html
    'react/button-has-type': 'error',
    // 先頭が大文字のコンポーネント関数を通常関数として直接呼ぶことを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/capitalized-calls.html
    'react/capitalized-calls': 'warn',
    // `checked` を指定する入力に `onChange` または `readOnly` を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/checked-requires-onchange-or-readonly.html
    'react/checked-requires-onchange-or-readonly': 'off',
    // コンポーネントの表示名を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/display-name.html
    'react/display-name': 'off',
    // 描画エラーの処理に Error Boundary を使う方針を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/error-boundaries.html
    'react/error-boundaries': 'error',
    // Hooks の依存配列の不足・不要な依存を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps.html
    'react/exhaustive-deps': 'error',
    // Effect の依存関係の整合性を React Compiler の観点で検査する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-effect-dependencies.html
    'react/exhaustive-effect-dependencies': 'warn',
    // コンポーネントへの指定した Props の受け渡しを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-component-props.html
    'react/forbid-component-props': 'off',
    // DOM 要素の指定した Props を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-dom-props.html
    'react/forbid-dom-props': 'warn',
    // 指定した JSX 要素を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/forbid-elements.html
    'react/forbid-elements': 'warn',
    // `forwardRef` のコールバックが `ref` 引数を受け取ることを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/forward-ref-uses-ref.html
    'react/forward-ref-uses-ref': 'error',
    // 関数コンポーネントの定義形式を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/function-component-definition.html
    // - 名前付き・匿名の両方の関数コンポーネントをアロー関数にする
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }],
    // 描画中などのグローバル値の不適切な変更を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/globals.html
    'react/globals': 'error',
    // `useState` の戻り値の分割代入・命名を検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/hook-use-state.html
    'react/hook-use-state': 'warn',
    // React Compiler が解析する Hooks の使用上の問題を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/hooks.html
    'react/hooks': 'warn',
    // `iframe` に `sandbox` 属性を要求する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/iframe-missing-sandbox.html
    'react/iframe-missing-sandbox': 'warn',
    // Props・State などの不変な値の変更を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/immutability.html
    'react/immutability': 'error',
    // メモ化と互換性がないライブラリの使用を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/incompatible-library.html
    'react/incompatible-library': 'error',
    // React Compiler が前提条件を満たせず解析できない箇所を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/invariant.html
    'react/invariant': 'warn',
    // JSX の真偽値属性の省略形式を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-boolean-value.html
    'react/jsx-boolean-value': 'warn',
    // JSX の文字列を囲む波括弧の使用方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-curly-brace-presence.html
    'react/jsx-curly-brace-presence': 'warn',
    // JSX を記述できるファイル拡張子を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-filename-extension.html
    'react/jsx-filename-extension': 'off',
    // Fragment の短縮構文と通常構文の方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-fragments.html
    'react/jsx-fragments': 'warn',
    // イベントハンドラーの Props 名・関数名を検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-handler-names.html
    'react/jsx-handler-names': 'warn',
    // リスト内の JSX 要素に `key` を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-key.html
    'react/jsx-key': 'error',
    // JSX のネストの深さを制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-max-depth.html
    'react/jsx-max-depth': 'warn',
    // JSX 内で通常のテキストになる誤ったコメントを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-comment-textnodes.html
    'react/jsx-no-comment-textnodes': 'warn',
    // 描画ごとに生成される Context の Value を検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-constructed-context-values.html
    'react/jsx-no-constructed-context-values': 'warn',
    // JSX 属性の重複を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-duplicate-props.html
    'react/jsx-no-duplicate-props': 'error',
    // JSX 内への文字列リテラルの直接記述を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-literals.html
    'react/jsx-no-literals': 'off',
    // JSX 属性の `javascript:` URL を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-script-url.html
    'react/jsx-no-script-url': 'warn',
    // 別タブで開くリンクの安全性を検査する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-target-blank.html
    'react/jsx-no-target-blank': 'off',
    // JSX 内の未定義のコンポーネント参照を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-undef.html
    'react/jsx-no-undef': 'error',
    // 不要な Fragment を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-no-useless-fragment.html
    'react/jsx-no-useless-fragment': 'off',
    // コンポーネント名を PascalCase にさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-pascal-case.html
    'react/jsx-pascal-case': 'error',
    // 同じ Props を複数回スプレッドすることを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spread-multi.html
    'react/jsx-props-no-spread-multi': 'error',
    // JSX への Props のスプレッドを制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/jsx-props-no-spreading.html
    'react/jsx-props-no-spreading': 'warn',
    // メモ化の依存関係を React Compiler の観点で検査する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/memo-dependencies.html
    'react/memo-dependencies': 'warn',
    // 配列の添字を `key` に使うことを禁止する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react/no-array-index-key.html
    'react/no-array-index-key': 'warn',
    // `children` を通常の属性として渡すことを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-children-prop.html
    'react/no-children-prop': 'error',
    // `cloneElement()` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/no-clone-element.html
    'react/no-clone-element': 'warn',
    // `dangerouslySetInnerHTML` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger.html
    'react/no-danger': 'warn',
    // `dangerouslySetInnerHTML` と `children` の併用を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-danger-with-children.html
    'react/no-danger-with-children': 'error',
    // Effect 内での不要な派生 State の生成を検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react/no-deriving-state-in-effects.html
    'react/no-deriving-state-in-effects': 'warn',
    // `componentDidMount` 内の `setState` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-mount-set-state.html
    'react/no-did-mount-set-state': 'error',
    // `componentDidUpdate` 内の `setState` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-did-update-set-state.html
    'react/no-did-update-set-state': 'error',
    // `this.state` の直接変更を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-direct-mutation-state.html
    'react/no-direct-mutation-state': 'error',
    // 非推奨の `findDOMNode()` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-find-dom-node.html
    'react/no-find-dom-node': 'error',
    // 非推奨の `isMounted()` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-is-mounted.html
    'react/no-is-mounted': 'error',
    // 1ファイル内の複数コンポーネント定義を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/no-multi-comp.html
    'react/no-multi-comp': 'off',
    // JSX の名前空間形式のタグ名を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/no-namespace.html
    'react/no-namespace': 'warn',
    // 参照型のデフォルト Props を毎回生成する書き方を検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react/no-object-type-as-default-prop.html
    'react/no-object-type-as-default-prop': 'warn',
    // `React.Children` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/no-react-children.html
    'react/no-react-children': 'warn',
    // PureComponent の不要な `shouldComponentUpdate` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/no-redundant-should-component-update.html
    'react/no-redundant-should-component-update': 'warn',
    // `ReactDOM.render()` の戻り値への依存を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-render-return-value.html
    'react/no-render-return-value': 'error',
    // クラスコンポーネントの `setState` の使用を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/no-set-state.html
    'react/no-set-state': 'warn',
    // 文字列形式の `ref` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-string-refs.html
    'react/no-string-refs': 'error',
    // 関数コンポーネント内の `this` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-this-in-sfc.html
    'react/no-this-in-sfc': 'error',
    // JSX テキスト内の未エスケープの特殊文字を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/no-unescaped-entities.html
    'react/no-unescaped-entities': 'off',
    // DOM 要素の不明・誤記された属性名を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/no-unknown-property.html
    'react/no-unknown-property': 'warn',
    // 非推奨の `UNSAFE` ライフサイクルメソッドを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-unsafe.html
    'react/no-unsafe': 'error',
    // 描画中の入れ子のコンポーネント定義を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/no-unstable-nested-components.html
    'react/no-unstable-nested-components': 'warn',
    // `componentWillUpdate` 内の `setState` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/no-will-update-set-state.html
    'react/no-will-update-set-state': 'error',
    // Fast Refresh に適したコンポーネントの `export` を検査する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components.html
    'react/only-export-components': 'off',
    // 旧式のクラス生成より ES クラスを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-es6-class.html
    'react/prefer-es6-class': 'warn',
    // クラスより関数コンポーネントを優先させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/prefer-function-component.html
    'react/prefer-function-component': 'warn',
    // 手動で設定したメモ化をコンパイラが維持できるか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/preserve-manual-memoization.html
    'react/preserve-manual-memoization': 'error',
    // 描画処理の純粋性を損なう呼び出しを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/purity.html
    'react/purity': 'error',
    // JSX を使うスコープに React の `import` を要求する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/react-in-jsx-scope.html
    'react/react-in-jsx-scope': 'off',
    // 描画中の `ref` の不適切な読み書きを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/refs.html
    'react/refs': 'error',
    // クラスの `render()` に戻り値を要求する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/react/require-render-return.html
    'react/require-render-return': 'off',
    // コンパイラの安全な最適化を妨げるルール抑制を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/rule-suppression.html
    'react/rule-suppression': 'warn',
    // Hooks を呼び出せる場所と順序を検査する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks.html
    'react/rules-of-hooks': 'off',
    // 子を持たない要素・コンポーネントを自己終了タグにさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/react/self-closing-comp.html
    'react/self-closing-comp': 'warn',
    // Effect 内の同期的な State 更新を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/set-state-in-effect.html
    'react/set-state-in-effect': 'error',
    // 描画中の無条件な State 更新を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/set-state-in-render.html
    'react/set-state-in-render': 'error',
    // クラスの State の初期化位置を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/react/state-in-constructor.html
    'react/state-in-constructor': 'warn',
    // 描画中の再生成を避けコンポーネント定義を安定させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/static-components.html
    'react/static-components': 'error',
    // `style` 属性の値にオブジェクトを要求する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/react/style-prop-object.html
    'react/style-prop-object': 'warn',
    // React Compiler による構文上の診断を検査する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/syntax.html
    'react/syntax': 'warn',
    // React Compiler が未対応として報告する解析箇所を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/todo.html
    'react/todo': 'warn',
    // React Compiler が対応していない構文を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/react/unsupported-syntax.html
    'react/unsupported-syntax': 'warn',
    // `useMemo` の使用がメモ化として意味を持つか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/use-memo.html
    'react/use-memo': 'error',
    // 子を持てない HTML 要素への `children` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/void-dom-elements-no-children.html
    'react/void-dom-elements-no-children': 'error',
    // 値を返さない `useMemo` のコールバックを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/react/void-use-memo.html
    'react/void-use-memo': 'error',

    // `unicorn` のルール

    // `catch` の例外変数の名前を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/catch-error-name.html
    'unicorn/catch-error-name': 'error',
    // Node.js の `assert` の読み込み・使用形式を統一する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-assert.html
    'unicorn/consistent-assert': 'off',
    // Date オブジェクトの複製方法を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-date-clone.html
    'unicorn/consistent-date-clone': 'warn',
    // 条件付きスプレッドにおける空配列の表現を統一する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-empty-array-spread.html
    'unicorn/consistent-empty-array-spread': 'off',
    // 検索結果のインデックスによる存在判定を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-existence-index-check.html
    'unicorn/consistent-existence-index-check': 'warn',
    // 外側の値に依存しない関数を適切な外側のスコープに移させる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-function-scoping.html
    'unicorn/consistent-function-scoping': 'warn',
    // テンプレートリテラル内のエスケープ方法を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/consistent-template-literal-escape.html
    'unicorn/consistent-template-literal-escape': 'warn',
    // 独自 Error クラスの定義形式を検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/custom-error-definition.html
    'unicorn/custom-error-definition': 'warn',
    // 空の波括弧の内側のスペースを検査する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/empty-brace-spaces.html
    'unicorn/empty-brace-spaces': 'warn',
    // Error の生成時にメッセージを要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/error-message.html
    'unicorn/error-message': 'warn',
    // 文字のエスケープに使う16進数字の大文字・小文字を統一する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/escape-case.html
    'unicorn/escape-case': 'off',
    // `length` に対する比較条件を明示させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-length-check.html
    'unicorn/explicit-length-check': 'off',
    // タイマーの待ち時間の引数を明示させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/explicit-timer-delay.html
    'unicorn/explicit-timer-delay': 'warn',
    // ファイル名の命名形式を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/filename-case.html
    'unicorn/filename-case': 'warn',
    // 指定したモジュールの `import` 形式を統一する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/import-style.html
    'unicorn/import-style': 'warn',
    // 関数呼び出しのネスト数を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/max-nested-calls.html
    'unicorn/max-nested-calls': 'warn',
    // 組み込み型の生成時の `new` の使用を検査する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/new-for-builtins.html
    'unicorn/new-for-builtins': 'off',
    // ルール名を指定しない広範な ESLint 無効化コメントを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-abusive-eslint-disable.html
    'unicorn/no-abusive-eslint-disable': 'warn',
    // Getter・Setter が自分自身を再帰的に呼ぶことを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-accessor-recursion.html
    'unicorn/no-accessor-recursion': 'warn',
    // 名前のない値の `default export` を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-anonymous-default-export.html
    'unicorn/no-anonymous-default-export': 'warn',
    // 配列コールバックに関数参照を直接渡すことを制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-callback-reference.html
    'unicorn/no-array-callback-reference': 'off',
    // `fill()` で同じ参照型の値を全要素に共有することを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-fill-with-reference-type.html
    'unicorn/no-array-fill-with-reference-type': 'warn',
    // 配列の `forEach()` よりループを使わせる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-for-each.html
    'unicorn/no-array-for-each': 'warn',
    // 配列メソッドの `thisArg` の使用を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-method-this-argument.html
    'unicorn/no-array-method-this-argument': 'warn',
    // 配列の `reduce()`・`reduceRight()` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reduce.html
    'unicorn/no-array-reduce': 'warn',
    // 元の配列を変更する `reverse()` を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-reverse.html
    'unicorn/no-array-reverse': 'warn',
    // 元の配列を変更する `sort()` を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-array-sort.html
    'unicorn/no-array-sort': 'warn',
    // `await` 式の直後にメンバーアクセスする書き方を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-expression-member.html
    'unicorn/no-await-expression-member': 'warn',
    // `Promise.all()` などに渡す要素内の不要な `await` を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-await-in-promise-methods.html
    'unicorn/no-await-in-promise-methods': 'error',
    // `Array.with()` の添字などの紛らわしい使用を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-confusing-array-with.html
    'unicorn/no-confusing-array-with': 'warn',
    // `console` 出力の引数の不要な先頭・末尾スペースを検出する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-console-spaces.html
    'unicorn/no-console-spaces': 'warn',
    // `document.cookie` の直接操作を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-document-cookie.html
    'unicorn/no-document-cookie': 'warn',
    // 空のファイルを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-empty-file.html
    'unicorn/no-empty-file': 'error',
    // 16進エスケープより Unicode エスケープを使わせる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-hex-escape.html
    'unicorn/no-hex-escape': 'off',
    // 生成直後の値をすぐ変更する書き方を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-immediate-mutation.html
    'unicorn/no-immediate-mutation': 'off',
    // `instanceof Array` より `Array.isArray()` を使わせる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-array.html
    'unicorn/no-instanceof-array': 'off',
    // 組み込み型の判定に適さない `instanceof` の使用を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-instanceof-builtins.html
    'unicorn/no-instanceof-builtins': 'warn',
    // `fetch()` の不正なオプションの組み合わせを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-fetch-options.html
    'unicorn/no-invalid-fetch-options': 'error',
    // 解除できないイベントリスナー指定を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-invalid-remove-event-listener.html
    'unicorn/no-invalid-remove-event-listener': 'error',
    // `slice()` の終端への不要な `length` 指定を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-length-as-slice-end.html
    'unicorn/no-length-as-slice-end': 'warn',
    // `else` などの中の孤立した `if` を整理させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-lonely-if.html
    'unicorn/no-lonely-if': 'off',
    // `flat()` に指定する深さのマジックナンバーを制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-magic-array-flat-depth.html
    'unicorn/no-magic-array-flat-depth': 'warn',
    // 否定条件を使う分岐より肯定条件を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negated-condition.html
    'unicorn/no-negated-condition': 'off',
    // 否定を挟んだ紛らわしい等価比較を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-negation-in-equality-check.html
    'unicorn/no-negation-in-equality-check': 'off',
    // 入れ子の三項演算子を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-nested-ternary.html
    'unicorn/no-nested-ternary': 'warn',
    // `new Array()` による配列生成を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-array.html
    'unicorn/no-new-array': 'error',
    // 非推奨の `new Buffer()` を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-new-buffer.html
    'unicorn/no-new-buffer': 'off',
    // `null` の使用を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-null.html
    'unicorn/no-null': 'off',
    // デフォルト引数としてのオブジェクト指定を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-object-as-default-parameter.html
    'unicorn/no-object-as-default-parameter': 'off',
    // `process.exit()` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-process-exit.html
    'unicorn/no-process-exit': 'warn',
    // 単一 Promise だけを `Promise.all()` などに渡す不要な処理を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-single-promise-in-promise-methods.html
    'unicorn/no-single-promise-in-promise-methods': 'error',
    // 静的メンバーだけを持つクラスを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-static-only-class.html
    'unicorn/no-static-only-class': 'off',
    // 意図せず Promise 相当として扱われる `then` メンバーを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-thenable.html
    'unicorn/no-thenable': 'error',
    // `this` を変数に代入することを禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-this-assignment.html
    'unicorn/no-this-assignment': 'off',
    // `typeof` による `undefined` 判定より直接比較を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-typeof-undefined.html
    'unicorn/no-typeof-undefined': 'off',
    // `flat()` の不要な深さ引数を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-flat-depth.html
    'unicorn/no-unnecessary-array-flat-depth': 'off',
    // `splice()` の不要な削除件数引数を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-array-splice-count.html
    'unicorn/no-unnecessary-array-splice-count': 'off',
    // Promise 相当ではない値への不要な `await` を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-await.html
    'unicorn/no-unnecessary-await': 'error',
    // `slice()` の不要な終端引数を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unnecessary-slice-end.html
    'unicorn/no-unnecessary-slice-end': 'off',
    // 空要素が多い読みにくい配列の分割代入を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-array-destructuring.html
    'unicorn/no-unreadable-array-destructuring': 'warn',
    // 読みにくい即時実行関数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-unreadable-iife.html
    'unicorn/no-unreadable-iife': 'off',
    // コレクション生成時の不要な引数を検出する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-collection-argument.html
    'unicorn/no-useless-collection-argument': 'warn',
    // 不要な `Error.captureStackTrace()` を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-error-capture-stack-trace.html
    'unicorn/no-useless-error-capture-stack-trace': 'warn',
    // スプレッドの不要な空オブジェクトへのフォールバックを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-fallback-in-spread.html
    'unicorn/no-useless-fallback-in-spread': 'error',
    // 反復可能な値の不要な配列化を検出する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-iterator-to-array.html
    'unicorn/no-useless-iterator-to-array': 'off',
    // 配列メソッドなどの前の不要な `length` 検査を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-length-check.html
    'unicorn/no-useless-length-check': 'error',
    // 不要な `Promise.resolve()`・`Promise.reject()` を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-promise-resolve-reject.html
    'unicorn/no-useless-promise-resolve-reject': 'off',
    // 不要なスプレッド構文を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-spread.html
    'unicorn/no-useless-spread': 'error',
    // 他の節と統合できる無意味な `case` 節を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-switch-case.html
    'unicorn/no-useless-switch-case': 'off',
    // 省略できる `undefined` を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-useless-undefined.html
    'unicorn/no-useless-undefined': 'off',
    // 整数値の不要な小数部 `.0` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/no-zero-fractions.html
    'unicorn/no-zero-fractions': 'warn',
    // 数値リテラルの接頭辞・指数表記の大文字・小文字を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/number-literal-case.html
    'unicorn/number-literal-case': 'warn',
    // 数値リテラルの桁区切りの位置を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/numeric-separators-style.html
    'unicorn/numeric-separators-style': 'off',
    // `on` 系プロパティへの代入より `addEventListener()` を優先させる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-add-event-listener.html
    'unicorn/prefer-add-event-listener': 'warn',
    // 単一要素の検索には `find()` を優先させる (perf) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-find.html
    'unicorn/prefer-array-find': 'warn',
    // 配列を平坦化する処理には `flat()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat.html
    'unicorn/prefer-array-flat': 'off',
    // `map()` と `flat()` の連結より `flatMap()` を優先させる (perf) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-flat-map.html
    'unicorn/prefer-array-flat-map': 'warn',
    // 値のインデックス検索には `indexOf()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-index-of.html
    'unicorn/prefer-array-index-of': 'warn',
    // 条件に合う要素の存在判定には `some()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-array-some.html
    'unicorn/prefer-array-some': 'off',
    // 末尾からの要素参照などには `at()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-at.html
    'unicorn/prefer-at': 'off',
    // 静的な `BigInt()` より `BigInt` リテラルを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-bigint-literals.html
    'unicorn/prefer-bigint-literals': 'warn',
    // Blob の読み取りには `text()`・`arrayBuffer()` などを優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-blob-reading-methods.html
    'unicorn/prefer-blob-reading-methods': 'off',
    // クラスのプロパティ初期化にはクラスフィールドを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-class-fields.html
    'unicorn/prefer-class-fields': 'warn',
    // クラスの条件付き追加・削除には `classList.toggle()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-classlist-toggle.html
    'unicorn/prefer-classlist-toggle': 'warn',
    // 文字コードの処理にはコードポイント対応 API を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-code-point.html
    'unicorn/prefer-code-point': 'off',
    // 現在時刻の数値取得には `Date.now()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-date-now.html
    'unicorn/prefer-date-now': 'off',
    // 関数内の引数の補完よりデフォルト引数を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-default-parameters.html
    'unicorn/prefer-default-parameters': 'warn',
    // `appendChild()` より `append()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-append.html
    'unicorn/prefer-dom-node-append': 'off',
    // `data` 属性の操作には `dataset` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-dataset.html
    'unicorn/prefer-dom-node-dataset': 'off',
    // 親からの `removeChild()` より要素の `remove()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-remove.html
    'unicorn/prefer-dom-node-remove': 'off',
    // テキストの操作には `textContent` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-dom-node-text-content.html
    'unicorn/prefer-dom-node-text-content': 'warn',
    // イベント通知の実装には EventTarget を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-event-target.html
    'unicorn/prefer-event-target': 'off',
    // `import` 後の `export` より直接の再 `export` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-export-from.html
    'unicorn/prefer-export-from': 'warn',
    // グローバルオブジェクトの参照には `globalThis` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-global-this.html
    'unicorn/prefer-global-this': 'warn',
    // `import.meta` の値から導出するより対応する専用プロパティを優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-import-meta-properties.html
    'unicorn/prefer-import-meta-properties': 'off',
    // 包含判定には `includes()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-includes.html
    'unicorn/prefer-includes': 'warn',
    // 古いキーコードより `KeyboardEvent.key` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-keyboard-event-key.html
    'unicorn/prefer-keyboard-event-key': 'warn',
    // 単純な代替値の三項演算より論理演算子を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-logical-operator-over-ternary.html
    'unicorn/prefer-logical-operator-over-ternary': 'warn',
    // 大小比較による選択より `Math.min()`・`Math.max()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-min-max.html
    'unicorn/prefer-math-min-max': 'off',
    // 小数部を捨てる処理には `Math.trunc()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-math-trunc.html
    'unicorn/prefer-math-trunc': 'off',
    // 古い DOM API より現在の DOM API を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-dom-apis.html
    'unicorn/prefer-modern-dom-apis': 'warn',
    // 手書きの数式より対応する Math API を優先させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-modern-math-apis.html
    'unicorn/prefer-modern-math-apis': 'warn',
    // CommonJS より ES Modules を優先させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-module.html
    'unicorn/prefer-module': 'warn',
    // 型変換には `String()`・`Number()` などの組み込み関数を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-native-coercion-functions.html
    'unicorn/prefer-native-coercion-functions': 'off',
    // 末尾を基準とする配列操作には負の添字を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-negative-index.html
    'unicorn/prefer-negative-index': 'warn',
    // Node.js 組み込みモジュールに `node:` 接頭辞を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-node-protocol.html
    'unicorn/prefer-node-protocol': 'error',
    // 数値変換には `Number()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-coercion.html
    'unicorn/prefer-number-coercion': 'off',
    // グローバルの数値関連関数・定数より Number のメンバーを優先させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-number-properties.html
    'unicorn/prefer-number-properties': 'warn',
    // キーと値の組からのオブジェクト生成には `Object.fromEntries()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-object-from-entries.html
    'unicorn/prefer-object-from-entries': 'warn',
    // 使用しない `catch` の例外変数を省略させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-optional-catch-binding.html
    'unicorn/prefer-optional-catch-binding': 'warn',
    // 一時的なリテラルを使うよりプロトタイプのメソッドを直接参照させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-prototype-methods.html
    'unicorn/prefer-prototype-methods': 'off',
    // 要素検索には `querySelector()`・`querySelectorAll()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-query-selector.html
    'unicorn/prefer-query-selector': 'off',
    // `Function.prototype.apply.call()` などより `Reflect.apply()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-reflect-apply.html
    'unicorn/prefer-reflect-apply': 'warn',
    // 一致の有無だけの判定には `RegExp.test()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-regexp-test.html
    'unicorn/prefer-regexp-test': 'off',
    // JSON レスポンスの生成には `Response.json()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-response-static-json.html
    'unicorn/prefer-response-static-json': 'warn',
    // 繰り返す包含判定などには `Set.has()` を優先させる (perf) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-has.html
    'unicorn/prefer-set-has': 'warn',
    // Set を配列化して数えるより `size` を優先させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-set-size.html
    'unicorn/prefer-set-size': 'error',
    // まとめられる同種のメソッド呼び出しを1回にまとめさせる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-single-call.html
    'unicorn/prefer-single-call': 'off',
    // 配列のコピーや結合にはスプレッド構文を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-spread.html
    'unicorn/prefer-spread': 'warn',
    // バックスラッシュの多い文字列には `String.raw` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-raw.html
    'unicorn/prefer-string-raw': 'warn',
    // 全置換には `replaceAll()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-replace-all.html
    'unicorn/prefer-string-replace-all': 'off',
    // `substring()`・`substr()` より `slice()` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-slice.html
    'unicorn/prefer-string-slice': 'off',
    // 文字列の先頭・末尾の判定には `startsWith()`・`endsWith()` を優先させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-starts-ends-with.html
    'unicorn/prefer-string-starts-ends-with': 'error',
    // `trimLeft()`・`trimRight()` より `trimStart()`・`trimEnd()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-string-trim-start-end.html
    'unicorn/prefer-string-trim-start-end': 'warn',
    // 値の深い複製には `structuredClone()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-structured-clone.html
    'unicorn/prefer-structured-clone': 'warn',
    // 単純な条件付き代入などには三項演算子を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-ternary.html
    'unicorn/prefer-ternary': 'off',
    // トップレベルの非同期処理にはトップレベル `await` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-top-level-await.html
    'unicorn/prefer-top-level-await': 'off',
    // 型の不正を表す例外には TypeError を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-type-error.html
    'unicorn/prefer-type-error': 'off',
    // 相対 URL の表記方法を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/relative-url-style.html
    // - `new URL()` に渡す相対 URL は `./` または `../` で始める・`import` パスや絶対 URL は対象外
    'unicorn/relative-url-style': ['error', 'always'],
    // `join()` の区切り文字を明示させる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-array-join-separator.html
    'unicorn/require-array-join-separator': 'warn',
    // 対象の `import` に必要なモジュール属性を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-attributes.html
    'unicorn/require-module-attributes': 'warn',
    // 空の `import`・`export` 指定子を避けさせる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-module-specifiers.html
    'unicorn/require-module-specifiers': 'warn',
    // `toFixed()` の小数桁数を明示させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-number-to-fixed-digits-argument.html
    'unicorn/require-number-to-fixed-digits-argument': 'off',
    // `postMessage()` の送信先 `origin` を明示させる (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/require-post-message-target-origin.html
    'unicorn/require-post-message-target-origin': 'warn',
    // `case` 節の波括弧の使用方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-braces.html
    'unicorn/switch-case-braces': 'warn',
    // `case` 節の `break` の配置を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/switch-case-break-position.html
    'unicorn/switch-case-break-position': 'warn',
    // 文字コード名の大文字・小文字を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/text-encoding-identifier-case.html
    'unicorn/text-encoding-identifier-case': 'warn',
    // Error を `throw` するときに `new` を付けさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/unicorn/throw-new-error.html
    'unicorn/throw-new-error': 'warn',

    // `typescript` のルール

    // 同じ関数のオーバーロード宣言を隣接させる (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/adjacent-overload-signatures.html
    'typescript/adjacent-overload-signatures': 'warn',
    // `T[]` と `Array<T>` の表記を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/array-type.html
    // - 通常の配列型は `Array<T>`、読み取り専用の配列型は `ReadonlyArray<T>` に統一する
    'typescript/array-type': ['error', { default: 'generic', readonly: 'generic' }],
    // Promise 相当ではない値への `await` を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/await-thenable.html
    'typescript/await-thenable': 'error',
    // `@ts-ignore` などの指示コメントを制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-ts-comment.html
    'typescript/ban-ts-comment': 'off',
    // TSLint の指示コメントを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-tslint-comment.html
    'typescript/ban-tslint-comment': 'warn',
    // 指定した型の使用を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/typescript/ban-types.html
    'typescript/ban-types': 'off',
    // 定数を返す Getter と読み取り専用プロパティの方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/class-literal-property-style.html
    'typescript/class-literal-property-style': 'warn',
    // ジェネリクスの型引数を記述する位置を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-generic-constructors.html
    'typescript/consistent-generic-constructors': 'warn',
    // インデックスシグネチャと Record の方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-indexed-object-style.html
    'typescript/consistent-indexed-object-style': 'warn',
    // 関数の戻り値の有無を型情報も考慮して統一する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-return.html
    'typescript/consistent-return': 'warn',
    // 型アサーションの記法と使用箇所を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-assertions.html
    'typescript/consistent-type-assertions': 'warn',
    // `type` と `interface` の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-definitions.html
    'typescript/consistent-type-definitions': ['warn', 'type'],
    // 型の `export` に `type` を明示する方針を指定する (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-exports.html
    'typescript/consistent-type-exports': 'warn',
    // 型の `import` に `type` を明示する方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/consistent-type-imports.html
    'typescript/consistent-type-imports': 'off',
    // 型情報も考慮して角括弧よりドットによるプロパティ参照を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/dot-notation.html
    'typescript/dot-notation': 'warn',
    // 関数の戻り値型の明示を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-function-return-type.html
    'typescript/explicit-function-return-type': 'warn',
    // クラスメンバーのアクセス修飾子の明示方針を指定する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-member-accessibility.html
    // - クラスのコンストラクタ・メソッド・プロパティ・アクセサーにアクセス修飾子を要求する
    // - JavaScript の `#private` は構文自体が Private を表すため追加の修飾子は不要
    'typescript/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    // 公開する関数の引数型・戻り値型の明示を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/explicit-module-boundary-types.html
    'typescript/explicit-module-boundary-types': 'warn',
    // 型内のメソッドシグネチャと関数プロパティの方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/method-signature-style.html
    'typescript/method-signature-style': 'warn',
    // 配列要素への `delete` を禁止する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-array-delete.html
    'typescript/no-array-delete': 'error',
    // 有用な文字列表現を持たないオブジェクトの文字列化を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-base-to-string.html
    'typescript/no-base-to-string': 'error',
    // 等価比較と紛らわしい非 `null` アサーションを禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-non-null-assertion.html
    'typescript/no-confusing-non-null-assertion': 'warn',
    // `void` 値を通常の値として扱う紛らわしい式を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-confusing-void-expression.html
    'typescript/no-confusing-void-expression': 'off',
    // 非推奨と指定された API の使用を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-deprecated.html
    'typescript/no-deprecated': 'off',
    // 列挙型の値の重複を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-enum-values.html
    'typescript/no-duplicate-enum-values': 'error',
    // ユニオン型・交差型の重複した構成型を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-duplicate-type-constituents.html
    'typescript/no-duplicate-type-constituents': 'error',
    // 動的なキーを指定した `delete` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-dynamic-delete.html
    'typescript/no-dynamic-delete': 'warn',
    // 空の `interface` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-interface.html
    'typescript/no-empty-interface': 'warn',
    // 意図しない広い型となる空のオブジェクト型を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-empty-object-type.html
    'typescript/no-empty-object-type': 'warn',
    // 明示的な `any` 型を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-explicit-any.html
    'typescript/no-explicit-any': 'warn',
    // 重複するなど不要な非 `null` アサーションを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extra-non-null-assertion.html
    'typescript/no-extra-non-null-assertion': 'error',
    // 名前空間代わりなどの不要なクラスを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-extraneous-class.html
    'typescript/no-extraneous-class': 'warn',
    // 処理結果や拒否を扱わない Promise を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-floating-promises.html
    'typescript/no-floating-promises': 'error',
    // 配列に対する `for in` を禁止する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-for-in-array.html
    'typescript/no-for-in-array': 'error',
    // 型演算により意図せず生成される空のオブジェクト型を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-generated-empty-object-type.html
    'typescript/no-generated-empty-object-type': 'warn',
    // 型情報を使い文字列をコードとして実行するタイマー呼び出しを検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-implied-eval.html
    'typescript/no-implied-eval': 'error',
    // 副作用のための `import` になるインライン型指定を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-import-type-side-effects.html
    'typescript/no-import-type-side-effects': 'warn',
    // 初期値から推論できる型注釈を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-inferrable-types.html
    'typescript/no-inferrable-types': 'off',
    // `void` 型の不適切な使用箇所を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-invalid-void-type.html
    'typescript/no-invalid-void-type': 'warn',
    // もともと `void` などである式への不要な `void` 演算を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-meaningless-void-operator.html
    'typescript/no-meaningless-void-operator': 'error',
    // `interface` の `new` メソッドなど誤ったコンストラクタ定義を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-new.html
    'typescript/no-misused-new': 'error',
    // 真偽値や `void` 関数を期待する箇所での Promise の誤用を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-promises.html
    'typescript/no-misused-promises': 'off',
    // Promise・文字列などの不適切なスプレッドを検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-misused-spread.html
    'typescript/no-misused-spread': 'error',
    // 数値と文字列を混在させた列挙型を禁止する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-mixed-enums.html
    'typescript/no-mixed-enums': 'off',
    // TypeScript の `namespace` の使用を制限する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-namespace.html
    'typescript/no-namespace': 'warn',
    // `??` の左辺での非 `null` アサーションを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-nullish-coalescing.html
    'typescript/no-non-null-asserted-nullish-coalescing': 'warn',
    // オプショナルチェーンの結果への非 `null` アサーションを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-asserted-optional-chain.html
    'typescript/no-non-null-asserted-optional-chain': 'error',
    // 後置 `!` による非 `null` アサーションを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-non-null-assertion.html
    'typescript/no-non-null-assertion': 'off',
    // 他の構成型に包含される冗長なユニオン型・交差型を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-redundant-type-constituents.html
    'typescript/no-redundant-type-constituents': 'error',
    // `require()` によるモジュール読み込みを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-require-imports.html
    'typescript/no-require-imports': 'warn',
    // 指定した型名の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-restricted-types.html
    'typescript/no-restricted-types': 'warn',
    // `this` を別の変数に代入することを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-this-alias.html
    'typescript/no-this-alias': 'error',
    // 真偽値リテラルとの不要な比較を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-boolean-literal-compare.html
    'typescript/no-unnecessary-boolean-literal-compare': 'warn',
    // 型上は常に真または偽となる不要な条件を検出する (nursery・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-condition.html
    'typescript/no-unnecessary-condition': 'off',
    // 引数プロパティへの重複した初期化代入を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-parameter-property-assignment.html
    'typescript/no-unnecessary-parameter-property-assignment': 'error',
    // 不要な名前空間修飾を検出する (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-qualifier.html
    'typescript/no-unnecessary-qualifier': 'warn',
    // テンプレート内の不要な埋め込み式を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-template-expression.html
    'typescript/no-unnecessary-template-expression': 'warn',
    // デフォルトと同じ不要な型引数を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-arguments.html
    'typescript/no-unnecessary-type-arguments': 'warn',
    // 型を変化させない不要な型アサーションを検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-assertion.html
    'typescript/no-unnecessary-type-assertion': 'warn',
    // Any・unknown など不要な型制約を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-constraint.html
    'typescript/no-unnecessary-type-constraint': 'warn',
    // 値の型を変えない不要な型変換を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-conversion.html
    'typescript/no-unnecessary-type-conversion': 'warn',
    // 型同士の関係を表さない不要な型パラメータを検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unnecessary-type-parameters.html
    'typescript/no-unnecessary-type-parameters': 'warn',
    // `any` 型の値を安全性が必要な引数に渡すことを検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-argument.html
    'typescript/no-unsafe-argument': 'off',
    // `any` 型などからの安全でない代入を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-assignment.html
    'typescript/no-unsafe-assignment': 'off',
    // `any` 型などの安全でない関数呼び出しを検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-call.html
    'typescript/no-unsafe-call': 'off',
    // クラスと `interface` などの危険な宣言マージを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-declaration-merging.html
    'typescript/no-unsafe-declaration-merging': 'error',
    // 列挙型と互換性のない値の比較を検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-enum-comparison.html
    'typescript/no-unsafe-enum-comparison': 'warn',
    // 安全でない Function 型の使用を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-function-type.html
    'typescript/no-unsafe-function-type': 'off',
    // `any` 型などへの安全でないプロパティアクセスを検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-member-access.html
    'typescript/no-unsafe-member-access': 'off',
    // `any` 型などの安全でない戻り値を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-return.html
    'typescript/no-unsafe-return': 'off',
    // 型を安全性の確認なしに狭めるアサーションを検出する (suspicious・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-type-assertion.html
    'typescript/no-unsafe-type-assertion': 'warn',
    // 数値ではない値への単項マイナスを検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-unsafe-unary-minus.html
    'typescript/no-unsafe-unary-minus': 'error',
    // 不要なデフォルト値の代入を検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-default-assignment.html
    'typescript/no-useless-default-assignment': 'error',
    // 既にモジュールであるファイルの不要な `export { }` を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-useless-empty-export.html
    'typescript/no-useless-empty-export': 'error',
    // 変数宣言での `require()` 読み込みを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-var-requires.html
    'typescript/no-var-requires': 'warn',
    // String などのラッパー型を禁止しプリミティブ型を使わせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/no-wrapper-object-types.html
    'typescript/no-wrapper-object-types': 'error',
    // `null`・`undefined` を除くだけの型アサーションの記法を指定する (restriction・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/non-nullable-type-assertion-style.html
    'typescript/non-nullable-type-assertion-style': 'warn',
    // `throw` する値を Error に制限する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/only-throw-error.html
    'typescript/only-throw-error': 'off',
    // コンストラクタ引数プロパティの使用方針を指定する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/parameter-properties.html
    'typescript/parameter-properties': 'warn',
    // リテラル型へのアサーションより `as const` を優先させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-as-const.html
    'typescript/prefer-as-const': 'error',
    // 列挙型の各メンバーに初期値を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-enum-initializers.html
    'typescript/prefer-enum-initializers': 'off',
    // `filter()[0]` などより `find()` を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-find.html
    'typescript/prefer-find': 'warn',
    // インデックスを使う単純なループより `for of` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-for-of.html
    'typescript/prefer-for-of': 'warn',
    // 呼び出しシグネチャだけの型より関数型を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-function-type.html
    'typescript/prefer-function-type': 'warn',
    // 包含判定には `indexOf()` などより `includes()` を優先させる (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-includes.html
    'typescript/prefer-includes': 'off',
    // 列挙型の初期値にリテラルを優先させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-literal-enum-member.html
    'typescript/prefer-literal-enum-member': 'warn',
    // `module` キーワードより `namespace` を優先させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-namespace-keyword.html
    'typescript/prefer-namespace-keyword': 'error',
    // `null`・`undefined` の代替値には `??` を優先させる (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-nullish-coalescing.html
    'typescript/prefer-nullish-coalescing': 'off',
    // 連続した `null` チェックよりオプショナルチェーンを優先させる (nursery・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-optional-chain.html
    'typescript/prefer-optional-chain': 'off',
    // 型情報に基づき Promise の拒否理由に Error を要求する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-promise-reject-errors.html
    'typescript/prefer-promise-reject-errors': 'off',
    // 変更しないクラスメンバーに readonly を要求する (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly.html
    'typescript/prefer-readonly': 'warn',
    // 関数の引数を読み取り専用の型にさせる (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-readonly-parameter-types.html
    'typescript/prefer-readonly-parameter-types': 'off',
    // `reduce()` の初期値の型アサーションより型引数を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-reduce-type-parameter.html
    'typescript/prefer-reduce-type-parameter': 'warn',
    // 正規表現による抽出には `match()` より `exec()` を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-regexp-exec.html
    'typescript/prefer-regexp-exec': 'warn',
    // メソッドの戻り値にクラス型より `this` 型を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-return-this-type.html
    'typescript/prefer-return-this-type': 'warn',
    // 文字列の先頭・末尾の判定に `startsWith()`・`endsWith()` を優先させる (style・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with.html
    'typescript/prefer-string-starts-ends-with': 'warn',
    // `@ts-ignore` より `@ts-expect-error` を優先させる (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-ts-expect-error.html
    'typescript/prefer-ts-expect-error': 'off',
    // Promise を返す関数に `async` を要求する (restriction・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/promise-function-async.html
    'typescript/promise-function-async': 'warn',
    // Getter と Setter の型の関係を検査する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/related-getter-setter-pairs.html
    'typescript/related-getter-setter-pairs': 'off',
    // 配列の `sort()` に比較関数を要求する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-array-sort-compare.html
    'typescript/require-array-sort-compare': 'error',
    // 型情報も考慮し `await` の不要な `async` 関数を検出する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/require-await.html
    'typescript/require-await': 'off',
    // `+` の両辺を互換性のある数値型・文字列型に制限する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-plus-operands.html
    'typescript/restrict-plus-operands': 'off',
    // テンプレート展開に使用できる型を制限する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/restrict-template-expressions.html
    'typescript/restrict-template-expressions': 'error',
    // Promise を返すときの `return await` の使用方針を指定する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/return-await.html
    'typescript/return-await': 'off',
    // 条件式などに使用する値の型を厳密に制限する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-boolean-expressions.html
    'typescript/strict-boolean-expressions': 'off',
    // `void` 戻り値を期待する関数からの値の返却を検査する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/strict-void-return.html
    'typescript/strict-void-return': 'off',
    // `switch` がユニオン型などの全候補を網羅するか検査する (pedantic・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/switch-exhaustiveness-check.html
    'typescript/switch-exhaustiveness-check': 'off',
    // 三重スラッシュ参照指示の使用方針を指定する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/typescript/triple-slash-reference.html
    'typescript/triple-slash-reference': 'error',
    // `this` の束縛を失うメソッドの取り出しを検出する (correctness・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/unbound-method.html
    'typescript/unbound-method': 'error',
    // 統合可能なオーバーロードシグネチャを検出する (style) https://oxc.rs/docs/guide/usage/linter/rules/typescript/unified-signatures.html
    'typescript/unified-signatures': 'warn',
    // `Promise.catch()` の例外引数を `any` より `unknown` にさせる (restriction・型情報が必要) https://oxc.rs/docs/guide/usage/linter/rules/typescript/use-unknown-in-catch-callback-variable.html
    'typescript/use-unknown-in-catch-callback-variable': 'warn',

    // `oxc` のルール

    // Math.PI などに近似した手書きの定数を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/oxc/approx-constant.html
    'oxc/approx-constant': 'warn',
    // `arguments` への不正な配列メソッド呼び出しを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-array-method-on-arguments.html
    'oxc/bad-array-method-on-arguments': 'error',
    // 論理演算子などとの取り違えが疑われるビット演算を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-bitwise-operator.html
    'oxc/bad-bitwise-operator': 'warn',
    // `charAt()` の戻り値との不適切な比較を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-char-at-comparison.html
    'oxc/bad-char-at-comparison': 'error',
    // 数学の不等式のように連鎖させた誤った比較を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-comparison-sequence.html
    'oxc/bad-comparison-sequence': 'error',
    // `matchAll()` に渡す正規表現などの不正な引数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-match-all-arg.html
    'oxc/bad-match-all-arg': 'error',
    // `Math.min()`・`Math.max()` の誤った組み合わせを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-min-max-func.html
    'oxc/bad-min-max-func': 'error',
    // 常に異なる参照になるオブジェクトリテラルとの比較を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-object-literal-comparison.html
    'oxc/bad-object-literal-comparison': 'error',
    // `replaceAll()` の不正な正規表現引数などを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/bad-replace-all-arg.html
    'oxc/bad-replace-all-arg': 'error',
    // 条件分岐で共通化できる同一の処理を検出する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/oxc/branches-sharing-code.html
    'oxc/branches-sharing-code': 'off',
    // 定数との比較条件の矛盾・冗長性を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/const-comparisons.html
    'oxc/const-comparisons': 'error',
    // 複数の比較を1つに簡略化できる条件を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/double-comparisons.html
    'oxc/double-comparisons': 'error',
    // 乗算のゼロなど元の値を常に消す演算を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/erasing-op.html
    'oxc/erasing-op': 'error',
    // 複合代入への変換を誤ったような代入式を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/oxc/misrefactored-assign-op.html
    'oxc/misrefactored-assign-op': 'warn',
    // Error を生成するだけで `throw` しない箇所を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/missing-throw.html
    'oxc/missing-throw': 'error',
    // 累積処理でのスプレッドによる繰り返しコピーを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-accumulating-spread.html
    'oxc/no-accumulating-spread': 'warn',
    // `async`・`await` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-await.html
    'oxc/no-async-await': 'off',
    // 指定のエンドポイントで `async` ハンドラーの使用を制限する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-async-endpoint-handlers.html
    'oxc/no-async-endpoint-handlers': 'warn',
    // 再 `export` を集約するバレルファイルを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-barrel-file.html
    'oxc/no-barrel-file': 'warn',
    // `const enum` の使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-const-enum.html
    'oxc/no-const-enum': 'warn',
    // `map()` 内での不要なスプレッドによるコピーを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-map-spread.html
    'oxc/no-map-spread': 'warn',
    // オプショナルチェーンの使用を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-optional-chaining.html
    'oxc/no-optional-chaining': 'off',
    // オブジェクトの残余プロパティ・スプレッド構文を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-rest-spread-properties.html
    'oxc/no-rest-spread-properties': 'off',
    // `export` された関数の `this` への依存を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/oxc/no-this-in-exported-function.html
    'oxc/no-this-in-exported-function': 'warn',
    // 数値系 API に渡す範囲外の引数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/number-arg-out-of-range.html
    'oxc/number-arg-out-of-range': 'error',
    // 再帰呼び出しのためだけに使用される値を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/only-used-in-recursion.html
    'oxc/only-used-in-recursion': 'error',
    // 配列コールバック内で参照するだけで呼んでいない関数を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/oxc/uninvoked-array-callback.html
    'oxc/uninvoked-array-callback': 'error',

    // `import` のルール

    // 型 `import` のインライン指定と宣言全体への指定を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/consistent-type-specifier-style.html
    'import/consistent-type-specifier-style': 'off',
    // `default import` の参照先に `default export` があるか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/import/default.html
    'import/default': 'error',
    // 重複や不正な `export` を検査する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/import/export.html
    'import/export': 'off',
    // `export` 宣言をファイルの末尾にまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/import/exports-last.html
    'import/exports-last': 'off',
    // `import` パスの拡張子の有無を指定する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/extensions.html
    'import/extensions': 'warn',
    // `import` 宣言を先頭にまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/import/first.html
    'import/first': 'warn',
    // 複数の `export` 宣言をまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/import/group-exports.html
    'import/group-exports': 'off',
    // ファイルの依存モジュール数を制限する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/import/max-dependencies.html
    'import/max-dependencies': 'off',
    // 名前付き `import`・`export` の参照先が存在するか検査する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/import/named.html
    'import/named': 'off',
    // 名前空間 `import` のメンバー参照が存在するか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/import/namespace.html
    'import/namespace': 'error',
    // `import` 群の後に空行を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import.html
    'import/newline-after-import': 'error',
    // 絶対パスによる `import` を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-absolute-path.html
    'import/no-absolute-path': 'warn',
    // AMD 形式のモジュール定義を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-amd.html
    'import/no-amd': 'warn',
    // 匿名値の `default export` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-anonymous-default-export.html
    'import/no-anonymous-default-export': 'warn',
    // CommonJS 形式のモジュール読み込み・公開を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-commonjs.html
    'import/no-commonjs': 'warn',
    // モジュール間の循環依存を検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-cycle.html
    'import/no-cycle': 'warn',
    // `default export` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export.html
    'import/no-default-export': 'off',
    // 同一モジュールへの `import` の重複を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-duplicates.html
    'import/no-duplicates': 'warn',
    // 動的なパスによる `require()` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-dynamic-require.html
    'import/no-dynamic-require': 'warn',
    // 空の名前付き `import` ブロックを禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-empty-named-blocks.html
    'import/no-empty-named-blocks': 'warn',
    // 変更可能な変数の `export` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-mutable-exports.html
    'import/no-mutable-exports': 'warn',
    // 名前付き `export` と同名の `default import` を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default.html
    'import/no-named-as-default': 'warn',
    // `default import` のメンバーと名前付き `export` の取り違えを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default-member.html
    'import/no-named-as-default-member': 'warn',
    // 名前付き構文による `default import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-default.html
    'import/no-named-default': 'warn',
    // 名前付き `export` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-export.html
    'import/no-named-export': 'off',
    // 名前空間 `import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-namespace.html
    'import/no-namespace': 'warn',
    // Node.js 組み込みモジュールの `import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/import/no-nodejs-modules.html
    'import/no-nodejs-modules': 'off',
    // 親ディレクトリへの相対 `import` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-relative-parent-imports.html
    'import/no-relative-parent-imports': 'off',
    // ファイル自身への `import` を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-self-import.html
    'import/no-self-import': 'warn',
    // 副作用だけを目的とする `import` を制限する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/import/no-unassigned-import.html
    'import/no-unassigned-import': 'off',
    // `import` パス内の Webpack ローダー記法を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/no-webpack-loader-syntax.html
    'import/no-webpack-loader-syntax': 'warn',
    // `export` が単一の場合は `default export` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/import/prefer-default-export.html
    'import/prefer-default-export': 'off',
    // スクリプトとモジュールを判別できる `import`・`export` を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/import/unambiguous.html
    'import/unambiguous': 'warn',

    // `jsdoc` のルール

    // JSDoc のアクセス修飾タグを検査する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-access.html
    'jsdoc/check-access': 'warn',
    // `@property` の名前・階層の整合性を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-property-names.html
    'jsdoc/check-property-names': 'error',
    // JSDoc のタグ名の妥当性を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/check-tag-names.html
    'jsdoc/check-tag-names': 'error',
    // 内容を取らないタグへの不要な記述を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/empty-tags.html
    'jsdoc/empty-tags': 'warn',
    // `@implements` をクラス以外に付けることを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/implements-on-classes.html
    'jsdoc/implements-on-classes': 'error',
    // 空の JSDoc ブロックを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/no-blank-blocks.html
    'jsdoc/no-blank-blocks': 'warn',
    // `@param` などへのデフォルト値の記述を制限する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/no-defaults.html
    'jsdoc/no-defaults': 'error',
    // 関数引数に対応する `@param` を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param.html
    'jsdoc/require-param': 'off',
    // `@param` の説明を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-description.html
    'jsdoc/require-param-description': 'off',
    // `@param` の引数名を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-name.html
    'jsdoc/require-param-name': 'off',
    // `@param` の型を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-param-type.html
    'jsdoc/require-param-type': 'off',
    // オブジェクトの型定義などに `@property` を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property.html
    'jsdoc/require-property': 'error',
    // `@property` の説明を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-description.html
    'jsdoc/require-property-description': 'error',
    // `@property` の名前を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-name.html
    'jsdoc/require-property-name': 'error',
    // `@property` の型を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-property-type.html
    'jsdoc/require-property-type': 'error',
    // 戻り値に対応する `@returns` を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns.html
    'jsdoc/require-returns': 'off',
    // `@returns` の説明を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns-description.html
    'jsdoc/require-returns-description': 'off',
    // `@returns` の型を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-returns-type.html
    'jsdoc/require-returns-type': 'off',
    // `@throws` の説明を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-throws-description.html
    'jsdoc/require-throws-description': 'warn',
    // `@throws` の型を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-throws-type.html
    'jsdoc/require-throws-type': 'off',
    // ジェネレータの値に対応する `@yields` を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields.html
    'jsdoc/require-yields': 'error',
    // `@yields` の説明を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields-description.html
    'jsdoc/require-yields-description': 'warn',
    // `@yields` の型を要求する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/jsdoc/require-yields-type.html
    'jsdoc/require-yields-type': 'off',

    // `vitest` のルール

    // データ駆動テストの `each` と `for` の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-each-for.html
    'vitest/consistent-each-for': 'warn',
    // テストファイルの命名形式を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-filename.html
    'vitest/consistent-test-filename': 'warn',
    // `test()` と `it()` の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-test-it.html
    'vitest/consistent-test-it': 'warn',
    // `vitest` と `vi` の API 名の使用を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/consistent-vitest-vi.html
    'vitest/consistent-vitest-vi': 'warn',
    // テスト内にアサーションを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/expect-expect.html
    'vitest/expect-expect': 'off',
    // 巻き上げられるモック API をファイルの上部に置かせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/hoisted-apis-on-top.html
    'vitest/hoisted-apis-on-top': 'error',
    // テスト内のアサーション数を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-expects.html
    'vitest/max-expects': 'off',
    // `describe()` のネスト数を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/max-nested-describe.html
    'vitest/max-nested-describe': 'warn',
    // 非推奨の別名マッチャーを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-alias-methods.html
    'vitest/no-alias-methods': 'warn',
    // コメントアウトされたテストを検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-commented-out-tests.html
    'vitest/no-commented-out-tests': 'warn',
    // 条件によって実行されないアサーションを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-expect.html
    'vitest/no-conditional-expect': 'error',
    // テスト内の条件分岐を禁止する (pedantic) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-in-test.html
    'vitest/no-conditional-in-test': 'off',
    // 条件によって定義が変わるテストを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-conditional-tests.html
    'vitest/no-conditional-tests': 'error',
    // `skip` などで無効化したテストを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-disabled-tests.html
    'vitest/no-disabled-tests': 'error',
    // 同じスコープの重複したフックを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-duplicate-hooks.html
    'vitest/no-duplicate-hooks': 'warn',
    // `only` などの特定テストだけを実行する指定を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-focused-tests.html
    'vitest/no-focused-tests': 'error',
    // `beforeEach` などのテストフックを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-hooks.html
    'vitest/no-hooks': 'off',
    // 同じスコープの重複したテストタイトルを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-identical-title.html
    'vitest/no-identical-title': 'warn',
    // Vitest のテスト内での `node:test` の `import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-import-node-test.html
    'vitest/no-import-node-test': 'warn',
    // グローバル利用する Vitest API の `import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-importing-vitest-globals.html
    // - Vitest は `globals` を有効にせず明示的に `import` する・自動修正で必要な `import` を削除させない
    'vitest/no-importing-vitest-globals': 'off',
    // インラインスナップショット内の式展開を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-interpolation-in-snapshots.html
    'vitest/no-interpolation-in-snapshots': 'warn',
    // 大きすぎるスナップショットを検出する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-large-snapshots.html
    'vitest/no-large-snapshots': 'warn',
    // `__mocks__` からの直接 `import` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-mocks-import.html
    'vitest/no-mocks-import': 'warn',
    // 指定したアサーションマッチャーを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-matchers.html
    'vitest/no-restricted-matchers': 'warn',
    // 指定した `vi` メソッドの使用を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-restricted-vi-methods.html
    'vitest/no-restricted-vi-methods': 'warn',
    // テスト外の独立した `expect()` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-standalone-expect.html
    'vitest/no-standalone-expect': 'error',
    // `fit`・`xit` などの接頭辞形式のテスト宣言を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-prefixes.html
    'vitest/no-test-prefixes': 'warn',
    // テストからの明示的な `return` を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-test-return-statement.html
    'vitest/no-test-return-statement': 'warn',
    // アサーションに渡す不要な `async` 関数を検出する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/no-unneeded-async-expect-function.html
    'vitest/no-unneeded-async-expect-function': 'warn',
    // `afterAll` ブロックの前後に空行を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/padding-around-after-all-blocks.html
    'vitest/padding-around-after-all-blocks': 'warn',
    // テストブロックの前後に空行を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/padding-around-test-blocks.html
    'vitest/padding-around-test-blocks': 'warn',
    // 呼び出し1回と引数の検証を専用マッチャーにまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-exactly-once-with.html
    'vitest/prefer-called-exactly-once-with': 'warn',
    // 1回だけの呼び出し検証には専用マッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-once.html
    'vitest/prefer-called-once': 'warn',
    // 呼び出し回数の検証には専用マッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-times.html
    'vitest/prefer-called-times': 'warn',
    // 呼び出しの有無だけでなく引数の検証を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-called-with.html
    'vitest/prefer-called-with': 'warn',
    // 大小比較には専用のマッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-comparison-matcher.html
    'vitest/prefer-comparison-matcher': 'warn',
    // 関数のテストの `describe` タイトルに関数参照を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-describe-function-title.html
    'vitest/prefer-describe-function-title': 'off',
    // 繰り返し定義するテストには `each` などのデータ駆動 API を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-each.html
    'vitest/prefer-each': 'warn',
    // 等価比較には専用のマッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-equality-matcher.html
    'vitest/prefer-equality-matcher': 'warn',
    // `expect.assertions()` などによるアサーション数の宣言を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-assertions.html
    'vitest/prefer-expect-assertions': 'off',
    // 非同期の結果検証には `resolves` マッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-resolves.html
    'vitest/prefer-expect-resolves': 'off',
    // 型のアサーションには `expectTypeOf()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-expect-type-of.html
    'vitest/prefer-expect-type-of': 'warn',
    // テストフックを実行順に並べさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-in-order.html
    'vitest/prefer-hooks-in-order': 'warn',
    // テストフックをスコープの先頭にまとめさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-hooks-on-top.html
    'vitest/prefer-hooks-on-top': 'warn',
    // モック対象を動的 `import` 形式で指定させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-import-in-mock.html
    'vitest/prefer-import-in-mock': 'off',
    // Vitest のグローバル API を明示的に `import` させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-importing-vitest-globals.html
    'vitest/prefer-importing-vitest-globals': 'warn',
    // テストタイトルの先頭を小文字にさせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-lowercase-title.html
    'vitest/prefer-lowercase-title': 'off',
    // Promise 用のモック短縮 API を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-promise-shorthand.html
    'vitest/prefer-mock-promise-shorthand': 'warn',
    // 戻り値用のモック短縮 API を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-mock-return-shorthand.html
    'vitest/prefer-mock-return-shorthand': 'warn',
    // スナップショットに説明用のヒントを付けさせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-snapshot-hint.html
    'vitest/prefer-snapshot-hint': 'error',
    // 手動の置き換えより `spyOn()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-spy-on.html
    'vitest/prefer-spy-on': 'warn',
    // 真偽値の検証には厳密な `true`・`false` のマッチャーを優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-boolean-matchers.html
    'vitest/prefer-strict-boolean-matchers': 'warn',
    // `toEqual()` より `toStrictEqual()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-strict-equal.html
    'vitest/prefer-strict-equal': 'off',
    // プリミティブ値などの比較には `toBe()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be.html
    'vitest/prefer-to-be': 'warn',
    // 偽と評価される値の検証には `toBeFalsy()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-falsy.html
    'vitest/prefer-to-be-falsy': 'warn',
    // オブジェクト型の検証には `toBeObject()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-object.html
    'vitest/prefer-to-be-object': 'warn',
    // 真と評価される値の検証には `toBeTruthy()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-be-truthy.html
    'vitest/prefer-to-be-truthy': 'warn',
    // 包含判定には `toContain()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-contain.html
    'vitest/prefer-to-contain': 'warn',
    // モックの呼び出し回数に専用マッチャーを使わせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-been-called-times.html
    'vitest/prefer-to-have-been-called-times': 'warn',
    // 長さの検証には `toHaveLength()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-to-have-length.html
    'vitest/prefer-to-have-length': 'warn',
    // 未実装の空のテストには `todo()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/prefer-todo.html
    'vitest/prefer-todo': 'warn',
    // `expect.poll()` の結果を `await` させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-awaited-expect-poll.html
    'vitest/require-awaited-expect-poll': 'error',
    // テストの準備処理などを適切なフック内に置かせる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-hook.html
    'vitest/require-hook': 'off',
    // 並行テストのスナップショットにローカルのテストコンテキストを使わせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-local-test-context-for-concurrent-snapshots.html
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    // モック生成時に型パラメータを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-mock-type-parameters.html
    'vitest/require-mock-type-parameters': 'off',
    // テストのタイムアウト値を明示させる (restriction) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-test-timeout.html
    'vitest/require-test-timeout': 'off',
    // 例外の検証でメッセージも確認させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-to-throw-message.html
    'vitest/require-to-throw-message': 'error',
    // テストをトップレベルの `describe()` で囲ませる (style) https://oxc.rs/docs/guide/usage/linter/rules/vitest/require-top-level-describe.html
    'vitest/require-top-level-describe': 'off',
    // `describe()` のコールバックの形式を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-describe-callback.html
    'vitest/valid-describe-callback': 'error',
    // `expect()` とマッチャーの呼び出し形式を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-expect.html
    'vitest/valid-expect': 'error',
    // Promise 内の `expect()` が正しく待機されるか検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-expect-in-promise.html
    'vitest/valid-expect-in-promise': 'error',
    // テストタイトルの形式・内容を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/valid-title.html
    'vitest/valid-title': 'error',
    // `todo()` として残った未実装テストを検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/vitest/warn-todo.html
    'vitest/warn-todo': 'error',

    // `jsx-a11y` のルール

    // 画像などに代替テキストを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/alt-text.html
    'jsx-a11y/alt-text': 'off',
    // リンクの目的が不明な曖昧なテキストを検出する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-ambiguous-text.html
    'jsx-a11y/anchor-ambiguous-text': 'off',
    // リンクに読み上げ可能な内容を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-has-content.html
    'jsx-a11y/anchor-has-content': 'off',
    // リンク先や用途が適切な `a` 要素であることを検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/anchor-is-valid.html
    'jsx-a11y/anchor-is-valid': 'off',
    // `aria-activedescendant` を持つ要素をフォーカス可能にさせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-activedescendant-has-tabindex.html
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    // ARIA 属性名の妥当性を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-props.html
    'jsx-a11y/aria-props': 'off',
    // ARIA 属性値の型・形式を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-proptypes.html
    'jsx-a11y/aria-proptypes': 'off',
    // `role` 属性の値の妥当性を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-role.html
    'jsx-a11y/aria-role': 'off',
    // ARIA 属性をサポートしない要素への指定を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/aria-unsupported-elements.html
    'jsx-a11y/aria-unsupported-elements': 'off',
    // `autocomplete` 属性の値の妥当性を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/autocomplete-valid.html
    'jsx-a11y/autocomplete-valid': 'off',
    // 非対話要素のクリック処理にキーボード操作を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/click-events-have-key-events.html
    'jsx-a11y/click-events-have-key-events': 'off',
    // 操作可能な要素に関連付けられたラベルを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/control-has-associated-label.html
    'jsx-a11y/control-has-associated-label': 'off',
    // 見出しに読み上げ可能な内容を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/heading-has-content.html
    'jsx-a11y/heading-has-content': 'off',
    // `html` 要素に `lang` 属性を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang.html
    'jsx-a11y/html-has-lang': 'off',
    // `iframe` に `title` 属性を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/iframe-has-title.html
    'jsx-a11y/iframe-has-title': 'off',
    // 画像の `alt` にある冗長な画像説明語を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/img-redundant-alt.html
    'jsx-a11y/img-redundant-alt': 'off',
    // 対話的な要素をフォーカス可能にさせる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/interactive-supports-focus.html
    'jsx-a11y/interactive-supports-focus': 'off',
    // `label` と入力要素の関連付けを要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/label-has-associated-control.html
    'jsx-a11y/label-has-associated-control': 'off',
    // `lang` 属性の言語タグを検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/lang.html
    'jsx-a11y/lang': 'off',
    // 音声・動画に字幕を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/media-has-caption.html
    'jsx-a11y/media-has-caption': 'off',
    // マウスによる操作に対応するキーボード操作を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/mouse-events-have-key-events.html
    'jsx-a11y/mouse-events-have-key-events': 'off',
    // キーボード操作と衝突する `accessKey` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-access-key.html
    'jsx-a11y/no-access-key': 'off',
    // フォーカス可能な要素の `aria-hidden` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-aria-hidden-on-focusable.html
    'jsx-a11y/no-aria-hidden-on-focusable': 'off',
    // 意図しないフォーカス移動を起こす `autoFocus` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-autofocus.html
    'jsx-a11y/no-autofocus': 'off',
    // 点滅・スクロールなど気を散らす要素を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-distracting-elements.html
    'jsx-a11y/no-distracting-elements': 'off',
    // 対話要素に非対話的な `role` を指定することを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-interactive-element-to-noninteractive-role.html
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    // 非対話要素への不適切なイベントハンドラーを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-interactions.html
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    // 非対話要素に不適切な対話的 `role` を指定することを禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-element-to-interactive-role.html
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    // 非対話要素への不要な `tabIndex` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-noninteractive-tabindex.html
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    // HTML の暗黙の役割と重複する `role` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-redundant-roles.html
    'jsx-a11y/no-redundant-roles': 'off',
    // 役割を持たない要素への対話処理を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/no-static-element-interactions.html
    'jsx-a11y/no-static-element-interactions': 'off',
    // `role` で代替するより適切な HTML 要素を優先させる (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/prefer-tag-over-role.html
    'jsx-a11y/prefer-tag-over-role': 'off',
    // `role` に必要な ARIA 属性を要求する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-has-required-aria-props.html
    'jsx-a11y/role-has-required-aria-props': 'off',
    // `role` がサポートしない ARIA 属性を検出する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/role-supports-aria-props.html
    'jsx-a11y/role-supports-aria-props': 'off',
    // `scope` 属性を適切な表の見出し要素に限定する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/scope.html
    'jsx-a11y/scope': 'off',
    // 正の値の `tabIndex` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/tabindex-no-positive.html
    'jsx-a11y/tabindex-no-positive': 'off',

    // `react-perf` のルール

    // Props に渡す JSX を描画ごとに生成することを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-jsx-as-prop.html
    'react-perf/jsx-no-jsx-as-prop': 'off',
    // Props に渡す配列を描画ごとに生成することを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-array-as-prop.html
    'react-perf/jsx-no-new-array-as-prop': 'off',
    // Props に渡す関数を描画ごとに生成することを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-function-as-prop.html
    'react-perf/jsx-no-new-function-as-prop': 'off',
    // Props に渡すオブジェクトを描画ごとに生成することを検出する (perf) https://oxc.rs/docs/guide/usage/linter/rules/react_perf/jsx-no-new-object-as-prop.html
    'react-perf/jsx-no-new-object-as-prop': 'off',

    // `promise` のルール

    // `then()` の各経路で値を返すか例外を投げることを要求する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/promise/always-return.html
    'promise/always-return': 'warn',
    // Promise の直接生成を制限する (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/avoid-new.html
    'promise/avoid-new': 'off',
    // Promise の拒否を処理するか呼び出し元に返すことを要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/promise/catch-or-return.html
    'promise/catch-or-return': 'warn',
    // Promise 内でのコールバック方式の併用を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-callback-in-promise.html
    'promise/no-callback-in-promise': 'error',
    // Promise を複数回解決・拒否する処理を検出する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-multiple-resolved.html
    'promise/no-multiple-resolved': 'warn',
    // Promise チェーンの不要なネストを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-nesting.html
    'promise/no-nesting': 'warn',
    // Promise の静的メソッドへの `new` を禁止する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-new-statics.html
    'promise/no-new-statics': 'error',
    // コールバック方式の処理内での Promise の併用を制限する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-promise-in-callback.html
    'promise/no-promise-in-callback': 'warn',
    // `finally()` 内の値を返す処理を禁止する (nursery) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-in-finally.html
    'promise/no-return-in-finally': 'off',
    // Promise コールバック内の不要な `resolve`・`reject` によるラップを禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/no-return-wrap.html
    'promise/no-return-wrap': 'warn',
    // Promise の Executor の引数名を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/param-names.html
    'promise/param-names': 'warn',
    // コールバック方式より `await` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-callbacks.html
    'promise/prefer-await-to-callbacks': 'warn',
    // `then()` チェーンより `await` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-await-to-then.html
    'promise/prefer-await-to-then': 'warn',
    // `then()` の第2引数より `catch()` を優先させる (style) https://oxc.rs/docs/guide/usage/linter/rules/promise/prefer-catch.html
    'promise/prefer-catch': 'warn',
    // 標準仕様にない Promise メソッドを禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/promise/spec-only.html
    'promise/spec-only': 'warn',
    // Promise の各メソッドの引数の数を検査する (correctness) https://oxc.rs/docs/guide/usage/linter/rules/promise/valid-params.html
    'promise/valid-params': 'error',

    // `node` のルール

    // コールバック呼び出し後の処理継続を避ける return を要求する (style) https://oxc.rs/docs/guide/usage/linter/rules/node/callback-return.html
    'node/callback-return': 'warn',
    // `module.exports` と `exports` の使用方針を統一する (style) https://oxc.rs/docs/guide/usage/linter/rules/node/exports-style.html
    'node/exports-style': 'warn',
    // `require()` をトップレベルに配置させる (style) https://oxc.rs/docs/guide/usage/linter/rules/node/global-require.html
    'node/global-require': 'warn',
    // コールバックのエラー引数の処理を要求する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/node/handle-callback-err.html
    'node/handle-callback-err': 'warn',
    // `exports` 変数自体への誤った代入を禁止する (suspicious) https://oxc.rs/docs/guide/usage/linter/rules/node/no-exports-assign.html
    'node/no-exports-assign': 'warn',
    // `require()` と通常の変数宣言の混在を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/node/no-mixed-requires.html
    'node/no-mixed-requires': 'warn',
    // `require()` と `new` を一体にした式を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/node/no-new-require.html
    'node/no-new-require': 'warn',
    // `__dirname`・`__filename` に対する文字列連結を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/node/no-path-concat.html
    'node/no-path-concat': 'warn',
    // `process.env` の直接参照を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/node/no-process-env.html
    'node/no-process-env': 'warn',
    // 同期版の Node.js API を禁止する (style) https://oxc.rs/docs/guide/usage/linter/rules/node/no-sync.html
    'node/no-sync': 'warn',
    // トップレベル `await` を禁止する (restriction) https://oxc.rs/docs/guide/usage/linter/rules/node/no-top-level-await.html
    'node/no-top-level-await': 'off'
  }
});
