export enum RequestMenthods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface ResponseInfoObject {
  message: string;
  status: ResponseStatus;
}
