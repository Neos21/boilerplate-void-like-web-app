import { type ReactNode, act } from 'react';
import { type Root, createRoot } from 'react-dom/client';
import { afterEach, beforeEach } from 'vitest';

import { useStore } from './client/stores/store';

/** Vitest で全てのテストが実行される前に自動で一度だけ読み込まれる共通の前処理を書く (`vite.config.ts` にて指定している) */

// `act` を使用するための設定 https://ja.react.dev/reference/react/act#error-the-current-testing-environment-is-not-configured-to-support-act
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const roots = new Map<HTMLElement, Root>();

/** React 標準 API で描画と後片付けを行う (Testing Library を使わないヘルパー) */
export const render = async (ui: ReactNode): Promise<{ container: HTMLElement }> => {
  const container = document.body.appendChild(document.createElement('div'));
  const root = createRoot(container);
  roots.set(container, root);
  await act(async () => {
    root.render(ui);
  });
  return { container };
};

/** クリックする */
export const click = async (element: HTMLElement): Promise<void> => {
  await act(async () => {
    element.click();
  });
};

// 各テスト前に LocalStorage と Store を確実に初期化する
beforeEach(() => {
  localStorage.clear();
  useStore.setState({ message: null, isHydrated: true });
});

// 各テスト後に React コンポーネントをクリアする
afterEach(async () => {
  for (const [container, root] of roots) {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  }
  roots.clear();
});
