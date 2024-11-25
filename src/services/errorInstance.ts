import { ResponseStatus } from '../utils/types';

export default class CustomError extends Error {
  status: string;
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = ResponseStatus.Error;
  }
}
