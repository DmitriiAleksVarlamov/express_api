import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { notFoundError, serverError } from './errors/handlers/errors';
import { apiRouter } from './routers/api.router';
import { logger } from './middlewares/logger.middleware';
import { dumpDatabase } from './db/utils/compres.db';
import { monitorSystem } from './utils/monitor-system';
import { secure } from './middlewares/secure.middleware';
import { staticFilesMiddleware } from './middlewares/static-files.middleware';

// CONSTANTS
const PORT = config.get('server.port');
const SECRET_KEY: string = config.get('app.cookieSecret');

const app = express();

/* CONFIGURATION */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(SECRET_KEY));
app.use(session(config.get('app.session')));
secure(app);

/*  LOGGING */
app.use(logger());
app.use(logger(true));

/* ROUTES */
app.use('/', apiRouter);

/* ERRORS */
app.use(notFoundError);
app.use(serverError);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server is listening on ${PORT}`));

dumpDatabase();
monitorSystem();
