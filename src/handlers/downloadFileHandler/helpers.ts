import { Stream } from 'node:stream';
import fs from 'node:fs';
import { FileModule } from '../../models/fileModule';

const prepareResponse = async (
  file: FileModule | null,
): Promise<{ isFile: boolean; stream: Stream }> => {
  let isFile = false;
  if (file) {
    const stats = await fs.promises.stat(file.pathname);
    isFile = stats.isFile();
  }

  let stream = Stream.Readable.from(
    JSON.stringify({ message: 'Файл не найден' }),
  );

  if (isFile) {
    stream = fs.createReadStream(file.pathname);
  }

  return { isFile, stream };
};

export { prepareResponse };
