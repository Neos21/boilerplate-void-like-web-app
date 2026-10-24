import { RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';

import { click, render } from '../vitest.setup';
import { routes } from './routes';

describe('App', () => {
  let router: ReturnType<typeof createMemoryRouter>;

  afterEach(() => router?.dispose());

  it('Outlet にページを表示し、リンクで SPA 遷移できる', async () => {
    router = createMemoryRouter(routes);
    // ページをレンダリングする
    const { container } = await render(<RouterProvider router={router} />);

    // Index ページを検証する
    await expect.poll(() => container.querySelector('h1')?.textContent).toBe('Index');
    // Index ページのリンクで遷移する
    const homeLink = container.querySelector<HTMLAnchorElement>('a[href="/home"]');
    expect(homeLink?.textContent).toBe('Home');
    await click(homeLink!);

    // 遷移先の Home ページを検証する
    await expect.poll(() => container.querySelector('h1')?.textContent).toBe('Home');
    expect(router.state.location.pathname).toBe('/home');
    // Home ページのリンクで遷移する
    const indexLink = container.querySelector<HTMLAnchorElement>('a[href="/"]');
    expect(indexLink?.textContent).toBe('Index');
    await click(indexLink!);

    // Index ページに再度遷移できたことを確認する
    await expect.poll(() => container.querySelector('h1')?.textContent).toBe('Index');
    expect(router.state.location.pathname).toBe('/');
  });

  it('Home の URL を直接指定しても共通レイアウトとページを表示できる', async () => {
    router = createMemoryRouter(routes, { initialEntries: ['/home'] });
    const { container } = await render(<RouterProvider router={router} />);

    expect(container.querySelector('h1')?.textContent).toBe('Home');
    expect(container.querySelector('header a')?.textContent).toBe('Example');
    expect(container.querySelector('button')?.textContent).toBe('Call API');
  });

  it('未定義ルートはエラーページを表示し、トップページに遷移できる', async () => {
    router = createMemoryRouter(routes, { initialEntries: ['/missing'] });
    const { container } = await render(<RouterProvider router={router} />);

    expect(container.querySelector('h1')?.textContent).toBe('404');
    const link = container.querySelector<HTMLAnchorElement>('a[href="/"]');
    expect(link?.textContent).toBe('トップに戻る');
    await click(link!);
    await expect.poll(() => container.querySelector('h1')?.textContent).toBe('Index');
  });
});
