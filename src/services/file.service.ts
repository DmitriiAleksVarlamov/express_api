import { fileFsModule, FileFsModule } from '../modules/fs/file.fs.module';
import { UploadedFile } from 'express-fileupload';
import { FileDb, FindDbResult } from '../utils/types';
import { fileDbModule, FileDbModule } from '../modules/db/file.db.module';
import path from 'node:path';
import { FileNotFoundError } from '../errors/file-not-found-error';
import { File } from '../models';
import { StatusCode } from '../constants';

class FileService {
  constructor(
    private fileFsModule: FileFsModule,
    private fileDbModule: FileDbModule,
  ) {}

  public async addFile(files: UploadedFile) {
    const createdAt = Date.now();

    const dataForSave: FileDb = { ...files, createdAt };
    const ext = path.extname(dataForSave.name);

    const filePath = await this.fileFsModule.writeFile(dataForSave);

    const file = await this.fileDbModule.saveFileStats(
      dataForSave,
      filePath,
      ext,
    );

    return this.prepareStatsData(file);
  }

  public async findById(id: string) {
    const file = await this.fileDbModule.findStatsById(id);

    if (!file) {
      throw new FileNotFoundError('Cannot find a file by ID');
    }

    return this.prepareStatsData(file);
  }

  public async findFileStats(limit: number, page: number) {
    const pageInt = this.checkPositiveInteger(page, 1);
    const limitInt = this.checkPositiveInteger(limit, 10);

    const files = await this.fileDbModule.findFiles(pageInt, limitInt);

    return files.map((file) => this.prepareStatsData(file));
  }

  private checkPositiveInteger(num: number, defaultValue: number): number {
    const isPositive = Number.isInteger(num) && num > 0;

    return isPositive ? num : defaultValue;
  }

  private prepareStatsData(stats: FindDbResult<File>) {
    return {
      name: stats.name,
      size: stats.size,
      mimetype: stats.mimetype,
      ext: stats.ext,
      createdAt: stats.createdAt,
      id: stats.id,
    };
  }

  public async removeFileAndStats(id: string) {
    // TODO Find a way to collaborate 1 and 2 in transaction
    const file = await this.fileDbModule.findAndRemove(id);
    if (!file) {
      throw new FileNotFoundError(
        'Cannot find the file by ID',
        StatusCode.BadRequest,
      );
    }

    await this.fileFsModule.removeFile(file.pathname);
  }
}

const fileService = new FileService(fileFsModule, fileDbModule);

export { fileService, FileService };
