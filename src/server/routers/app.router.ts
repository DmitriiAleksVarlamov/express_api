import express from 'express';
import { appController, AppController } from '../controllers/app.controller';

class AppRouter {
  constructor(
    private router: express.Router,
    private appController: AppController,
  ) {
    this.setupRouter();
  }

  get appRouter() {
    return this.router;
  }

  private setupRouter() {
    this.router
      .route('/ping')
      .get(this.appController.pong.bind(this.appController));
    this.router.route('/:alias').get(this.appController.matchAlias);
    this.router.route('/alias').post(this.appController.addAlias);
  }
}

const appRouter = new AppRouter(express.Router(), appController).appRouter;

export { appRouter, AppRouter };
