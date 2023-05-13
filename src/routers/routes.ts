import express from 'express';
import { fileRouter } from './file.router';
import { authRouter } from './auth.router';

type Route = { path: string; router: express.Router };

type Routes = Route[];

const apiRoutes: Routes = [
  { path: '/file', router: fileRouter },
  { path: '/auth', router: authRouter },
];

// /Users/dmitrijvarlamov/Desktop/node-core/ERP.AERO/src/routers/auth.router.ts:20
//   .route(this.authPaths.signUp)
// ^
// TypeError: Cannot read property 'signUp' of undefined

/*const authRouterPaths = {
  signUp: '/signUp',
} as const;

enum FileRouterPaths {
  upload = '/upload',
  getList = '/list',
  deleteById = '/delete/:id',
  getById = '/:id',
  download = '/download/:id',
  update = '/update/:id',
}*/

// const fileRoutes: Routes = [
//   { path: '/upload', router: '' },
//   { path: '/list', router: '' },
//   { path: '/delete/:id', router: '' },
//   { path: '/:id', router: '' },
//   { path: '/download/:id', router: '' },
//   { path: '/update/:id', router: '' },
// ];

export { apiRoutes, Route, Routes /*, FileRouterPaths, authRouterPaths */ };
