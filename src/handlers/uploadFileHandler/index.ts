import { NextFunction, Request, Response } from 'express';
import {
  prepareFormData,
  saveInFileSystem,
  saveStatsInDatabase,
} from './helpers';

export const uploadFileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dateNow = Date.now();
    const extractedFormData = prepareFormData(req);

    const [isFSWritten, filePath] = await saveInFileSystem(
      extractedFormData,
      dateNow,
    );
    const savedFile = await saveStatsInDatabase(
      isFSWritten,
      extractedFormData,
      filePath,
      dateNow,
    );

    const status = savedFile ? 200 : 400;
    const errorResponse = { message: 'Файл не сохранен' };

    // TODO Prepare response appearence
    res.status(status).send(savedFile || errorResponse);
  } catch (error) {
    // TODO Найти способ сделать ошибки удобочитаемыми
    next(error);
  }
};
