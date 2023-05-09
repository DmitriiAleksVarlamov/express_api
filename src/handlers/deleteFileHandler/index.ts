import { NextFunction, Request, Response } from 'express';
import { deleteFileDatabase } from '../../models/fileModule';
import { deleteFileSystemStorage } from './helpers';
import { StatusCode } from '../../constants';

export const deleteFileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // TODO Find a way to collaborate 1 and 2 in transaction
    const file = await deleteFileDatabase(id);
    const isSucceeded = await deleteFileSystemStorage(file);

    const statusCode = isSucceeded ? StatusCode.OK : StatusCode.BadRequest;

    res.status(statusCode).send({ isSucceeded });
  } catch (error) {
    // TODO Найти способ сделать ошибки удобочитаемыми
    next(error);
  }
};
