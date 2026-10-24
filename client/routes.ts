import type { RouteObject } from 'react-router';

import { Layout } from './layouts/layout';
import { Home } from './pages/home/home';
import { Index } from './pages/index/index';
import { App, ErrorBoundary } from './root';

/** React Router の Data Mode でのルーティング定義 */
export const routes = [
  {
    path: '/',
    Component: App,
    ErrorBoundary,
    children: [
      { index: true, Component: Index },
      {
        Component: Layout,
        children: [{ path: 'home', Component: Home }]
      }
    ]
  }
] satisfies Array<RouteObject>;
