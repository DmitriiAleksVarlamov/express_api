import { createWriteStream, createReadStream } from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

const DUMP_DELAY = 1000000;

function dumpDatabase() {
  setInterval(() => {
    const inputPath = path.resolve(__dirname, '../prod.db.json');
    const dumpPath = path.resolve(
      __dirname,
      '../dumps',
      `./${Date.now()}_dump.db.json.gz`,
    );

    // eslint-disable-next-line no-console
    compress(inputPath, dumpPath).catch((error) => console.error(error));

    // eslint-disable-next-line no-console
    console.log('Database dump created');
  }, DUMP_DELAY);
}

function compress(inputFilePath: string, dumpPath: string) {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(inputFilePath);

    const writeStream = createWriteStream(dumpPath, { flags: 'a' });

    readStream
      .pipe(zlib.createGzip())
      .pipe(writeStream)
      .on('error', reject)
      .on('finish', resolve);
  });
}

export { dumpDatabase };
