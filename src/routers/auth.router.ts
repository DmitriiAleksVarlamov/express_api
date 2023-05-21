import express from 'express';
import { authController, AuthController } from '../controllers/auth.controller';
import { authMiddleware, AuthMiddleware } from '../middlawares/auth.middleware';

class AuthRouter {
  constructor(
    private router: express.Router,
    private authController: AuthController,
    private authMiddleware: AuthMiddleware,
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
    this.router
      .route('/logOut')
      .get(
        this.authMiddleware.bearerStrategy,
        this.authController.logOut.bind(this.authController),
      );
  }
}

const authRouter = new AuthRouter(
  express.Router(),
  authController,
  authMiddleware,
).authRouter;

export { authRouter, AuthRouter };
