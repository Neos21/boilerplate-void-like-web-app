import { Hono } from 'hono';

import type { HonoBindings } from '../../types/hono-bindings';
import { examples, examplesPath } from './examples/examples';

export const api = new Hono<HonoBindings>();
export const apiPath = '/api' as const;

api.route(examplesPath, examples);
