import { type ReactElement, act } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, Outlet, RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it } from 'vitest';

/** Example : React Router SPA を対象としたベンチマークテスト (別ファイルには依存しておらず、ベンチマークテストの記述サンプルとして) */

// `act` を使用するための設定 (`happy-dom` で React の更新完了を待つ)
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const SampleRoot = (): ReactElement => {
  return (
    <main>
      <h1>Benchmark</h1>
      <Outlet />
    </main>
  );
};

const SamplePage = ({ count }: { count: number }): ReactElement => {
  return (
    <ul>
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <Link to={`/items/${index}`}>Item {index}</Link>
        </li>
      ))}
    </ul>
  );
};

describe('React Router SPA のベンチマーク', () => {
  it('React Router SPA のベンチマーク', async ({ bench }) => {
    for (const count of [10, 100]) {
      // 1回ごとに生成・描画・破棄する・クリーンアップの時間も計測に含む
      await bench(`${count} 件のリンク : Router 生成 → 描画 → 破棄のベンチマーク`, async () => {
        const container = document.body.appendChild(document.createElement('div'));
        const root = createRoot(container);
        const router = createMemoryRouter([
          {
            path: '/',
            element: <SampleRoot />,
            children: [{ index: true, element: <SamplePage count={count} /> }]
          }
        ]);

        try {
          await act(async () => {
            root.render(<RouterProvider router={router} />);
          });
        } finally {
          await act(async () => {
            root.unmount();
          });
          router.dispose();
          container.remove();
        }
      }).run();
    }
  });
});
