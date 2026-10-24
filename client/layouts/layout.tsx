import type { ReactElement } from 'react';
import { Link, Outlet } from 'react-router';

/** 共通レイアウト */
export const Layout = (): ReactElement => {
  return (
    <div>
      <header className="mb-8">
        <Link to="/home" className="link link-info link-hover font-bold">
          Example
        </Link>
      </header>

      <Outlet />
    </div>
  );
};
