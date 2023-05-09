import { NextFunction, Request, Response } from 'express';

const notFoundError = (req: Request, res: Response) =>
  res.status(404).send('404');

const serverError = (
    err: Record<string, unknown>, req: Request, res: Response, next: NextFunction,
) => {
  res.status(500);
  res.send(err);
  // res.render('error', { error: err })
};

export { notFoundError, serverError };