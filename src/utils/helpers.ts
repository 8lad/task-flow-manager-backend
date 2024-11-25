import { ResponseInfoObject, ResponseStatus } from './types';

export const getSuccessResponseInfoObject = (message: string): ResponseInfoObject => ({
  message,
  status: ResponseStatus.Success,
});

export const getErrorResponseInfoObject = (message: string): ResponseInfoObject => ({
  message,
  status: ResponseStatus.Error,
});
