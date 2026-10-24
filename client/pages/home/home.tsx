import ky from 'ky';
import { type ReactElement, useState } from 'react';
import { Link } from 'react-router';

import type { Result } from '../../../shared/types/result';
import { extractApiErrorMessage } from '../../helpers/extract-api-error-message';
import { useStore } from '../../stores/store';

/** ホームページ */
export const Home = (): ReactElement => {
  const store = useStore(); // Zustand Store

  const [apiResult, setApiResult] = useState<string | null>(null); // API 結果メッセージ・Store に保存する
  const [apiError, setApiError] = useState<string | null>(null); // API エラーメッセージ・Store には保存しない

  /** ボタン押下時 : API コールする */
  const onClick = async (): Promise<void> => {
    setApiResult(null);
    setApiError(null);
    try {
      const result = await ky.get('/api/examples').json<Result<string>>();
      if (result.error != null) {
        setApiError(result.error);
        store.setMessage(null);
        return;
      }

      setApiResult(result.result);
      store.setMessage(result.result);
    } catch (error) {
      setApiError(extractApiErrorMessage(error, '未知のエラー'));
      store.setMessage(null);
    }
  };

  return (
    <main className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-lg font-bold">Home</h1>

      <p className="mb-2">
        <button type="button" className="btn" onClick={onClick}>
          Call API
        </button>
      </p>
      {apiResult != null && <p className="text-success mb-2">{apiResult}</p>}
      {apiError != null && <p className="text-error mb-2">{apiError}</p>}

      <p>
        <Link to="/" className="link link-info link-hover">
          Index
        </Link>
      </p>
    </main>
  );
};
