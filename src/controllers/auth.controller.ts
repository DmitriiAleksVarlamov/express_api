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

      const user = await this.authService.checkUser({ email, password, req });

      res.send(user);
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }

  public async logOut(req: Request, res: Response) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { email } = req.user;

      await this.authService.removeGadget(req, email);

      res.send('Logout was successfully');
    } catch (error) {
      this.utils.prepareErrorResponse(res, error);
    }
  }
}

const authController = new AuthController(authService, utils);

export { authController, AuthController };
