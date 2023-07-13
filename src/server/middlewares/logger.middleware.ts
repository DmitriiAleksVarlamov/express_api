import morgan from 'morgan';
import { createWriteStream } from 'node:fs';
import path from 'node:path';

function logger(toFile = false) {
  const streamPath = path.join(
    process.cwd(),
    '/src/server/db/logger/access.log',
  );

  const stream = toFile ? createWriteStream(streamPath) : undefined;

  return morgan(':method :url - :status :response-time ms', { stream });
}

export { logger };
