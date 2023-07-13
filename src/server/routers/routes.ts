import express from 'express';
import { appRouter } from './app.router';

type Route = { path: string; router: express.Router };

type Routes = Route[];

const apiRoutes: Routes = [{ path: '/', router: appRouter }];

export { apiRoutes, Route, Routes };
