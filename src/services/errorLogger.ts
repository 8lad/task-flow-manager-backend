import { Response, Request, NextFunction } from 'express';

export const errorLogger = async (
  error: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  console.error(`
    *** Error has been detected ***
    *** Error message ${error.message} ***
    *** Error stack ${error.stack} ***
    `);
  next(error);
};
