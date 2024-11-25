import { DEVELOPMENT_MODE_STATE } from './types';

export const isDevelopmentMode = (): boolean => {
  return (!process.env.NODE_ENV && process.env.NODE_ENV === DEVELOPMENT_MODE_STATE) || false;
};
