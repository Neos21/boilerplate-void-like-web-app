import type { ReactElement } from 'react';
import { Link, Outlet, ScrollRestoration, isRouteErrorResponse, useRouteError } from 'react-router';

import { httpStatusCode } from '../shared/constants/http-status-code';
import { isEmpty } from '../shared/helpers/is-empty';

import './styles.css';

/** アプリケーションルート */
export const App = (): ReactElement => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

/** エラーページ */
export const ErrorBoundary = (): ReactElement => {
  const error = useRouteError();
  let title: string = 'エラー';
  let text: string = 'エラーが発生しました';
  if (isRouteErrorResponse(error)) {
    if (error.status === httpStatusCode.notFound) {
      title = '404';
      text = 'ページが見つかりませんでした';
    }
    if (!isEmpty(error.statusText)) text = error.statusText;
  }

  return (
    <div className="text-error">
      <h1 className="mb-4 text-lg font-bold">{title}</h1>
      <p className="mb-4">{text}</p>
      <p>
        <Link to="/" className="link link-info link-hover">
          トップに戻る
        </Link>
      </p>
    </div>
  );
};
