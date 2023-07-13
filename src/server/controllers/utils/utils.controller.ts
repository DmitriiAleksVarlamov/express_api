import { Response } from 'express';
import { StatusCode } from '../../constants';

class UtilsController {
  public prepareErrorResponse(res: Response, error) {
    const code = error.code || StatusCode.ServerError;
    res.status(code).send({ message: error.message });
  }
}

const utils = new UtilsController();
export { utils, UtilsController };
