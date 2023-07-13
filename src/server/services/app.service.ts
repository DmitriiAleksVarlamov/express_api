import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { UrlNotFoundError } from '../errors/url-not-found-error';
import { StatusCode } from '../constants';
import { BadRequest } from '../errors/bad-request';
import { ServerError } from '../errors/server-error';

class AppService {
  async readUrls(alias: string) {
    const parsedUrls = await this.readUrlsFromDb();

    const urlByAlias = parsedUrls[alias];

    if (!urlByAlias) {
      throw new UrlNotFoundError(
        'You sent wrong alias, cannot find url by alias',
        StatusCode.BadRequest,
      );
    }

    return urlByAlias;
  }

  async addUrlsPair(url?: string, alias?: string): Promise<void> {
    if (typeof url !== 'string' || typeof alias !== 'string') {
      throw new BadRequest(
        'Parameters Url or Alias is not correct. They should valid strings',
        StatusCode.BadRequest,
      );
    }

    const parsedUrls = await this.readUrlsFromDb();

    if (parsedUrls[alias]) {
      throw new BadRequest('Alias already exists', StatusCode.BadRequest);
    }

    parsedUrls[alias] = url;
    const filePath = this.generatePathToDb();

    await this.writeFile<Record<string, string>>(filePath, parsedUrls);
  }

  private async readUrlsFromDb(): Promise<Record<string, string>> {
    const filePath = this.generatePathToDb();

    return await this.readFile<Record<string, string>>(filePath);
  }

  private generatePathToDb() {
    const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

    return path.join(process.cwd(), 'src', 'server', 'db', `${env}.db.json`);
  }

  private async writeFile<T>(path: string, data: T): Promise<void> {
    try {
      await writeFile(path, JSON.stringify(data));
    } catch (error) {
      throw new ServerError(
        'An error occurred while creating new link alias',
        StatusCode.ServerError,
      );
    }
  }

  private async readFile<T>(path: string): Promise<T> {
    try {
      const urlAliases = await readFile(path, { encoding: 'utf-8' });

      return JSON.parse(urlAliases);
    } catch (error) {
      throw new ServerError(
        'An error occurred while reading link alias',
        StatusCode.ServerError,
      );
    }
  }
}

const appService = new AppService();
export { appService, AppService };
