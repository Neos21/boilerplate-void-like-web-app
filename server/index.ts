import { Hono } from 'hono';

import { api, apiPath } from './routes/api/api';
import type { HonoBindings } from './types/hono-bindings';

export const app = new Hono<HonoBindings>(); // ユニットテスト向けに Named Export も行っておく

app.route(apiPath, api);

// NOTE : エントリポイントとしてファイルパス指定しているため `default export` が必須
export default app;
