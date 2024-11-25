import { Request, Response } from 'express';
import { getErrorResponseInfoObject } from '../utils/helpers';

export const notFoundErrorHandler = async (req: Request, res: Response) => {
  res.status(404).json(getErrorResponseInfoObject('Rout is not found'));
};