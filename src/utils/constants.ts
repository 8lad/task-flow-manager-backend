export const ALL_ENV_VARIABLES = [
  'SERVER_PORT',
  'BASE_ROUTE',
  'ORIGIN_URL',
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'AUTH0_CALLBACK_URL',
  'SESSION_SECRET',
];
export const ALL_ROUTES = '*';
export const SPARE_DEV_PORT = 3200;

export const REQUEST_TIME_LIMIT = 10 * 60 * 1000;
export const REQUEST_AMOUNT_LIMIT = 100;
export const DEVELOPMENT_MODE_STATE = 'development';

export enum ApplicationRoutes {
  Users = '/users',
  SingleUser = '/users/:id',
}
