import { ResponseInfoObject, ResponseStatus } from './types';

export const getSuccessResponseInfoObject = (message: string): ResponseInfoObject => ({
  message,
  status: ResponseStatus.Success,
});

export const getErrorResponseInfoObject = (message: string): ResponseInfoObject => ({
  message,
  status: ResponseStatus.Error,
});

export const getPrismaUserSearchParameter = (searchParameter: string | number) =>
  typeof searchParameter !== 'string' ? { id: searchParameter } : { email: searchParameter };
