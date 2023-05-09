import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fileUpload from 'express-fileupload';

import fileRouter from './routes/file';
import { notFoundError, serverError } from './handlers/errors';

// CONSTANTS
const PORT = config.get('server.port');
const SECRET_KEY: string = config.get('app.cookieSecret');

const app = express();

/* CONFIGURATION */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload(config.get('app.fileUpload')));
app.use(cookieParser(SECRET_KEY));
app.use(session(config.get('app.session')));
app.use(cors());

/* ROUTES */
app.use('/file', fileRouter);

/* ERRORS */
app.use(notFoundError);
app.use(serverError);

mongoose
  .set('strictQuery', false)
  .connect(config.get('mongo.url'))
  .then(() => {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.log(`${error} did not connect`));
