import express from 'express';
import { authController, AuthController } from '../controllers/auth.controller';

class AuthRouter {
  constructor(
    private router: express.Router,
    private authController: AuthController,
  ) {
    this.setupRouter();
  }

  get authRouter() {
    return this.router;
  }

  private setupRouter() {
    this.router
      .route('/signUp')
      .post(this.authController.signUp.bind(this.authController));
    this.router
      .route('/logIn')
      .post(this.authController.login.bind(this.authController));
  }
}

const authRouter = new AuthRouter(express.Router(), authController).authRouter;

export { authRouter, AuthRouter };
