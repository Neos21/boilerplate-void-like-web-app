import type { ReactElement } from 'react';
import { Link } from 'react-router';

import { useStore } from '../../stores/store';

/** トップページ */
export const Index = (): ReactElement => {
  const message = useStore(state => state.message); // Zustand Store

  return (
    <main className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-lg font-bold">Index</h1>

      <p className="mb-4">Store Message : [{message ?? '(なし)'}]</p>

      <p>
        <Link to="/home" className="link link-info link-hover">
          Home
        </Link>
      </p>
    </main>
  );
};
