import { NextFunction, Request, Response } from 'express';
import { findSingleFile } from '../../models/fileModule';
import { StatusCode } from '../../constants';

export const getSingleFileStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const singleFileInfo = await findSingleFile(id);
    const statusCode = singleFileInfo ? StatusCode.OK : StatusCode.NotFound;
    const notFound = {
      message: 'По предоставленному ID не удалось ничего найти',
    };
    res.status(statusCode).send(singleFileInfo || notFound);
  } catch (error) {
    // TODO Найти способ сделать ошибки удобочитаемыми
    next(error);
  }
};
