import { FileDb } from '../../utils/types';
import { FileModel } from '../../models';

class FileDbModule {
  constructor(private fileModel: typeof FileModel) {}

  public async saveFileStats(data: FileDb, pathname: string, ext: string) {
    return this.fileModel.create({
      pathname,
      createdAt: new Date(data.createdAt),
      name: data.name,
      size: data.size,
      mimetype: data.mimetype,
      ext,
    });
  }

  public async findStatsById(id: string) {
    return FileModel.findById(id).exec();
  }

  public async findFiles(page: number, limit: number) {
    return FileModel.find()
      .limit(limit)
      .skip(limit * (page - 1));
  }

  public async findAndRemove(id: string) {
    return FileModel.findByIdAndRemove(id).exec();
  }
}

const fileDbModule = new FileDbModule(FileModel);
export { fileDbModule, FileDbModule };
