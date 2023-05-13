import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../../constants';

const notFoundError = (req: Request, res: Response) =>
  res.status(404).send('404');

const serverError = (
  err: Record<string, unknown>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCode.ServerError);
  res.send(err);
};

export { notFoundError, serverError };
