import { DEVELOPMENT_MODE_STATE } from './constants';

export const isDevelopmentMode = (): boolean => {
  return (process.env.NODE_ENV && process.env.NODE_ENV === DEVELOPMENT_MODE_STATE) || true;
};
