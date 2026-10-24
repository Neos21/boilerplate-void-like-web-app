/** Hono Context の Binding や Variables 定義 */
export type HonoBindings = {
  /** Workers の環境 Binding : `$ cf workers types` で出力した `.cloudflare/types/index.d.ts` から `Env` を参照・結合する */
  Bindings: Cloudflare.Env & {
    /** Example : シークレット定義 */
    EXAMPLE_SECRET: string;
  };
};
