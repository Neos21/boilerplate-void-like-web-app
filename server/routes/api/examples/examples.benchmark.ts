import { Hono } from 'hono';
import { test } from 'vitest';

/** Example : Hono API を用いたベンチマークテスト (別ファイルには依存しておらず、ベンチマークテストの記述サンプルとして) */
const app = new Hono();

app.get('/api/examples/:id', context => {
  return context.json({ result: { id: context.req.param('id'), message: 'Example' } });
});

test('Hono API のベンチマーク', async ({ bench }) => {
  await bench('GET → JSON レスポンスの読み取りのベンチマーク', async () => {
    const response = await app.request('/api/examples/123');
    await response.json();
  }).run();
});
