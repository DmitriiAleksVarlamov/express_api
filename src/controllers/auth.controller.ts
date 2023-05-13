import { authService, AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { utils, UtilsController } from './utils/utils.controller';

class AuthController {
  constructor(
    private authService: AuthService,
    private utils: UtilsController,
  ) {}

  public async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.createUser({ email, password });

      return res.send({ email: user.email, id: user.id });
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const user = await this.authService.checkUser({ email, password });

      res.send(user);
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }
}

const authController = new AuthController(authService, utils);

export { authController, AuthController };
