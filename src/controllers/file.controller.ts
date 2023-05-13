import { fileService, FileService } from '../services/file.service';
import { Request, Response } from 'express';
import { StatusCode } from '../constants';
import { UploadedFile } from 'express-fileupload';
import { utils, UtilsController } from './utils/utils.controller';

class FileController {
  constructor(
    private fileService: FileService,
    private utils: UtilsController,
  ) {}

  public async upload(req: Request, res: Response) {
    try {
      const files = req.files.data as unknown as UploadedFile;

      const stats = await this.fileService.addFile(files);
      // req.user - contains userID

      res.send(stats);
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const stats = await this.fileService.findById(id);

      res.send(stats);
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }

  public async getList(req: Request, res: Response) {
    try {
      const { limit, page } = req.query;

      const files = await this.fileService.findFileStats(
        Number(limit),
        Number(page),
      );

      res.send(files);
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.fileService.removeFileAndStats(id);

      res.status(StatusCode.NoContent).send({ isSucceeded: true });
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }
}

const fileController = new FileController(fileService, utils);

export { fileController, FileController };
