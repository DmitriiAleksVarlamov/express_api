import { NextFunction, Request, Response } from 'express';

function removePoweredBy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.removeHeader('X-Powered-By');

  next();
}

export { removePoweredBy };
