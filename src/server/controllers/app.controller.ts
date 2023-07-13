import { Request, Response } from 'express';
import { utils, UtilsController } from './utils/utils.controller';
import { AppService, appService } from '../services/app.service';
import { StatusCode } from '../constants';

class AppController {
  constructor(private utils: UtilsController, private appService: AppService) {}

  pong(request: Request, response: Response) {
    try {
      return response.send('pong');
    } catch (error) {
      this.utils.prepareErrorResponse(response, error);
    }
  }

  matchAlias = async (
    request: Request<{ alias: string }>,
    response: Response,
  ) => {
    try {
      const { params } = request;

      const url = await this.appService.readUrls(params.alias);

      if (process.env.NODE_ENV === 'development') {
        return response.send({ url });
      }

      response.status(StatusCode.Found).redirect(url);
    } catch (error) {
      this.utils.prepareErrorResponse(response, error);
    }
  };

  addAlias = async <P, ResBody>(
    request: Request<P, ResBody, { alias?: string; url?: string }>,
    response: Response,
  ) => {
    try {
      const { body } = request;

      await this.appService.addUrlsPair(body.url, body.alias);

      return response.send({ status: 'success' });
    } catch (error) {
      this.utils.prepareErrorResponse(response, error);
    }
  };
}

const appController = new AppController(utils, appService);
export { appController, AppController };
