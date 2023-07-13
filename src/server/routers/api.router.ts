import express from 'express';
import { Route, Routes, apiRoutes } from './routes';

class ApiRouter {
  constructor(private router: express.Router, private routes: Routes) {
    this.setUpApiRoutes(routes);
  }

  public get apiRouter() {
    return this.router;
  }

  private addApiRoute(path: Route['path'], router: Route['router']) {
    this.router.use(path, router);
  }

  private setUpApiRoutes(routes: Routes) {
    routes.forEach(({ path, router }) => {
      this.addApiRoute(path, router);
    });
  }
}

const apiRouter = new ApiRouter(express.Router(), apiRoutes).apiRouter;

export { apiRouter, ApiRouter };
