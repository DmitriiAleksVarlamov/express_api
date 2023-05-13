import express from 'express';
import { fileRouter } from './file.router';
import { authRouter } from './auth.router';

type Route = { path: string; router: express.Router };

type Routes = Route[];

const apiRoutes: Routes = [
  { path: '/file', router: fileRouter },
  { path: '/auth', router: authRouter },
];

export { apiRoutes, Route, Routes };
