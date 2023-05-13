import { authService, AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { StatusCode } from '../constants';
import { MatchPasswordsError } from '../errors/match-passwords-error';
import { UserNotFoundError } from '../errors/user-not-found-error';

class AuthController {
  constructor(private authService: AuthService) {}

  public async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.createUser({ email, password });
      user.toObject();

      return res.send({ email: user.email, id: user.id });
    } catch (error) {
      if (error.code) {
        return res.status(StatusCode.Forbidden).send({
          message: error.message,
        });
      }

      return res
        .status(StatusCode.ServerError)
        .send({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { password, email } = req.body;

      const user = await this.authService.checkUser({ email, password });

      res.send(user);
    } catch (error) {
      if (
        error instanceof MatchPasswordsError ||
        error instanceof UserNotFoundError
      ) {
        return res
          .status(StatusCode.BadRequest)
          .send({ message: error.message });
      }

      res.status(StatusCode.ServerError).send({ message: error.message });
    }
  }
}

const authController = new AuthController(authService);

export { authController, AuthController };
