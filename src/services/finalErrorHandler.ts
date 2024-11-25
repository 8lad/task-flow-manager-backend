import CustomError from './errorInstance';
import { Response, Request, NextFunction } from 'express';

export const finalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.statusCode || 500).json({ message: error.message, status: error.status });
  next();
};
