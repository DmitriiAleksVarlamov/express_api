import { NextFunction, Request, Response } from 'express';
import { findSingleFile } from '../../models/fileModule';
import { StatusCode } from '../../constants';
import { prepareResponse } from './helpers';

const downloadFileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const file = await findSingleFile(id);
    const data = await prepareResponse(file);
    const statusCode = data.isFile ? StatusCode.OK : StatusCode.NotFound;
    res.writeHead(statusCode);
    data.stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

export { downloadFileHandler };
