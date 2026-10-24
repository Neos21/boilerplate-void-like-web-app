import { Hono } from 'hono';

import { httpStatusCode } from '../../../../shared/constants/http-status-code';
import type { Result } from '../../../../shared/types/result';
import type { HonoBindings } from '../../../types/hono-bindings';

export const examples = new Hono<HonoBindings>();
export const examplesPath = '/examples' as const;

/** Example : ランダムにレスポンスする */
examples.get('/', async context => {
  // DB アクセスをテストする
  const dbResult = await context.env.DB.prepare('SELECT 1 AS value').first<{ value: number }>();
  console.log('DB アクセス結果', dbResult);

  if (Math.random() < 0.5) {
    return context.json<Result<string>>({ result: '正常レスポンス' }, httpStatusCode.ok);
  } else {
    return context.json<Result<string>>({ error: 'エラーレスポンス' }, httpStatusCode.badRequest);
  }
});
