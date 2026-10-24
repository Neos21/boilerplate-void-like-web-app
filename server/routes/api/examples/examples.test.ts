import { describe, expect, it, vi } from 'vitest';

import { app } from '../../../index';

// Example : Hono サーバのテスト
describe('examples API', () => {
  it.each([
    { random: 0.1, status: 200, body: { result: '正常レスポンス' } },
    { random: 0.9, status: 400, body: { error: 'エラーレスポンス' } }
  ])('GET /api/examples : $status を返す', async ({ random, status, body }) => {
    // `Math.random()` でランダムなレスポンスを出し分けるサンプルがあるためモック化して結果値を固定する
    vi.spyOn(Math, 'random').mockReturnValue(random);

    // DB アクセスの結果モック
    const first = vi.fn().mockResolvedValue({ value: 1 });
    // DB 操作を行う `prepare()` メソッドをモック化する
    const prepare = vi.fn().mockReturnValue({ first });
    // このエンドポイントが使用する DB としてのモックを用意する
    const db = { prepare } as unknown as D1Database;

    const response = await app.request(
      '/api/examples',
      {},
      {
        DB: db
      }
    );

    expect(response.status).toBe(status);
    expect(await response.json()).toEqual(body);
    expect(prepare).toHaveBeenCalledExactlyOnceWith('SELECT 1 AS value');
    expect(first).toHaveBeenCalledExactlyOnceWith();
  });
});
