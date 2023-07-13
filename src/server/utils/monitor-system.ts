import util from 'node:util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('node:child_process').exec);
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const DELAY = 1000;

function monitorSystem() {
  setInterval(async () => {
    const { pid } = process;
    const { stdout } = await exec(
      `ps -p ${pid} -o pid,vsz=MEMORY,pcpu -o comm`,
    );

    const log = `${Date.now()}'\n'${stdout}`;
    const cpuLogPath = path.resolve(__dirname, '../db/logger/cpu-memory.log');

    try {
      await writeFile(cpuLogPath, log, { flag: 'a' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, DELAY);
}

export { monitorSystem };
