import { NextFunction, Request, Response } from 'express';
import { findFilesDatabase } from '../../models/fileModule';
import { toPositiveNumber } from './helpers';
import { StatusCode } from '../../constants';

export const getFileListHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit, page } = req.query;

    const limitNumber = toPositiveNumber(limit);
    const pageNumber = toPositiveNumber(page);

    if (limitNumber && pageNumber) {
      const files = await findFilesDatabase(limitNumber, pageNumber);

      res.status(StatusCode.OK).send(files);
    } else {
      // TODO Найти способ сделать ошибки удобочитаемыми
      res
        .status(StatusCode.BadRequest)
        .send({ message: 'Параметры запроса введены некорректно' });
    }
  } catch (error) {
    // TODO Найти способ сделать ошибки удобочитаемыми
    next(error);
  }
};
