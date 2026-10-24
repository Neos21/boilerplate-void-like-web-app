import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { render } from '../../../vitest.setup';
import { useStore } from '../../stores/store';
import { Index } from './index';

describe('Index', () => {
  it('ページの見出しと未設定のメッセージを表示する', async () => {
    // レンダリングする
    const { container } = await render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // ページの内容を検証する
    expect(container.querySelector('h1')?.textContent).toBe('Index');

    expect(container.textContent).toContain('Store Message : [(なし)]');

    const link = container.querySelector('a');
    expect(link?.textContent).toBe('Home');
    expect(link?.getAttribute('href')).toBe('/home');
  });

  it('Store に保存されたメッセージを表示する', async () => {
    // Store に値を保存する
    useStore.setState({ message: 'テストメッセージ' });
    // レンダリングする
    const { container } = await render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // メッセージを検証する
    expect(container.textContent).toContain('Store Message : [テストメッセージ]');
  });
});
