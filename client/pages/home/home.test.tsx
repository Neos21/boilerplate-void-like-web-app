import { act } from 'react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Result } from '../../../shared/types/result';
import { click, render } from '../../../vitest.setup';
import { useStore } from '../../stores/store';
import { Home } from './home';

/** `ky` の `get()`・`json()` をモック化する */
const { get, json } = vi.hoisted(() => {
  const json = vi.fn();
  return { json, get: vi.fn(() => ({ json })) };
});

// `ky` による HTTP 通信をモック化する
vi.mock('ky', () => ({ default: { get } }));

const renderHome = async (): Promise<{ container: HTMLElement }> => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home', () => {
  beforeEach(() => {
    get.mockClear();
    json.mockReset();
  });

  it('初期表示の見出し・ボタン・Index リンクを表示する', async () => {
    const { container } = await renderHome();

    expect(container.querySelector('h1')?.textContent).toBe('Home');
    expect(container.querySelector('button')?.textContent).toBe('Call API');

    const link = container.querySelector('a');
    expect(link?.textContent).toBe('Index');
    expect(link?.getAttribute('href')).toBe('/');
    expect(container.querySelector('.text-success')).toBeNull();
    expect(container.querySelector('.text-error')).toBeNull();
    expect(get).not.toHaveBeenCalled();
  });

  it('API の正常応答を表示し Store に保存する', async () => {
    json.mockResolvedValue({ result: '正常レスポンス' });
    const { container } = await renderHome();

    await click(container.querySelector('button')!);

    expect(get).toHaveBeenCalledExactlyOnceWith('/api/examples');
    expect(container.querySelector('.text-success')?.textContent).toBe('正常レスポンス');
    expect(container.querySelector('.text-error')).toBeNull();
    expect(useStore.getState().message).toBe('正常レスポンス');
  });

  it.each([
    {
      name: '応答ボディの Error',
      body: { error: '業務エラー' },
      error: undefined,
      expected: '業務エラー'
    },
    {
      name: 'ky の例外データ',
      body: undefined,
      error: { data: { error: 'API エラー' } },
      expected: 'API エラー'
    },
    {
      name: '通信例外',
      body: undefined,
      error: new Error('Network error'),
      expected: '未知のエラー'
    }
  ])('$name を表示し、Store の以前のメッセージを消す', async ({ body, error, expected }) => {
    useStore.setState({ message: '以前のメッセージ' });
    if (body != null) json.mockResolvedValue(body);
    else json.mockRejectedValue(error);
    const { container } = await renderHome();

    await click(container.querySelector('button')!);

    expect(container.querySelector('.text-error')?.textContent).toBe(expected);
    expect(container.querySelector('.text-success')).toBeNull();
    expect(useStore.getState().message).toBeNull();
  });

  it('再呼び出し開始時に前回の表示を消し、次の応答で更新する', async () => {
    json.mockResolvedValueOnce({ result: '前回の結果' });
    const { container } = await renderHome();

    const button = container.querySelector('button')!;
    await click(button);
    expect(container.querySelector('.text-success')?.textContent).toBe('前回の結果');

    let resolveResponse!: (value: Result<string>) => void;
    json.mockReturnValueOnce(
      new Promise<Result<string>>(resolve => {
        resolveResponse = resolve;
      })
    );
    await click(button);
    expect(container.querySelector('.text-success')).toBeNull();
    expect(container.querySelector('.text-error')).toBeNull();

    await act(async () => {
      resolveResponse({ error: '再呼び出しエラー' });
    });
    expect(container.querySelector('.text-error')?.textContent).toBe('再呼び出しエラー');
    expect(useStore.getState().message).toBeNull();

    json.mockReturnValueOnce(
      new Promise<Result<string>>(resolve => {
        resolveResponse = resolve;
      })
    );
    await click(button);
    expect(container.querySelector('.text-error')).toBeNull();

    await act(async () => {
      resolveResponse({ result: '再取得した結果' });
    });
    expect(container.querySelector('.text-success')?.textContent).toBe('再取得した結果');
    expect(container.querySelector('.text-error')).toBeNull();
    expect(useStore.getState().message).toBe('再取得した結果');
    expect(get).toHaveBeenCalledTimes(3);
  });
});
