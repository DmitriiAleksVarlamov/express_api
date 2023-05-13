import { FileDb } from '../../utils/types';
import path from 'node:path';
import fs from 'node:fs';

class FileFsModule {
  constructor() {}

  public async writeFile(dataForSave: FileDb): Promise<string> {
    const dirPath = await this.createDir('uploads');

    const { data, name, createdAt } = dataForSave;

    const uniqueFileName = this.generateUniqueFileName(name, createdAt);
    const filePath = path.join(dirPath, uniqueFileName);

    await fs.promises.writeFile(filePath, data);

    return filePath;
  }

  private async createDir(dirName: string): Promise<string> {
    const dataDir = path.resolve(process.cwd(), `src/${dirName}`);
    const toBool = [() => true, () => false];
    const isDirExists = await fs.promises.access(dataDir).then(...toBool);

    if (!isDirExists) {
      await fs.promises.mkdir(dataDir, { recursive: true });
    }

    return dataDir;
  }

  private generateUniqueFileName(name: string, timestamp: number) {
    return [timestamp, name].join('-');
  }

  public async removeFile(pathname: string) {
    return fs.promises.rm(pathname, {
      recursive: true,
      maxRetries: 2,
      force: true,
    });
  }
}

const fileFsModule = new FileFsModule();

export { fileFsModule, FileFsModule };
