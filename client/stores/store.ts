import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** 状態管理する State */
type State = {
  /** メッセージ・なければ `null` */
  message: string | null;
  /** LocalStorage からの復元処理が完了したか否か */
  isHydrated: boolean;

  /** メッセージを保存する */
  setMessage: (message: string | null) => void;
  /** 復元処理が完了したか否かを更新する */
  setIsHydrated: () => void;
};

/** 状態を永続化する Store */
export const useStore = create<State>()(
  persist(
    set => ({
      message: null,
      isHydrated: false,

      setMessage: (message): void => {
        set({ message });
      },
      setIsHydrated: (): void => {
        set({ isHydrated: true });
      }
    }),
    {
      /** Store 名 */
      name: 'store',

      /** LocalStorage に `isHydrated` を保存しないよう調整する */
      partialize: state => ({ message: state.message }),
      /** LocalStorage からの復元が終わった時に自動発火する処理 */
      onRehydrateStorage:
        (): ((state: State | undefined) => void) =>
        (state: State | undefined): void =>
          state?.setIsHydrated()
    }
  )
);
