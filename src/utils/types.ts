import { Prisma } from '@prisma/client';

export enum RequestMenthods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface ResponseInfoObject {
  message: string;
  status: ResponseStatus;
}

export interface CreateUserData {
  name: string;
  email: string;
  auth0Id: string;
}

export type SingleUserSearchParams = {
  [key in keyof Prisma.UserSelect]?: boolean;
};
