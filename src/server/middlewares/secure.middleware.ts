import { Express } from 'express';
import { removePoweredBy } from './utils/remove-powered-by';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import speedLimiter from 'express-slow-down';

function secure(app: Express) {
  app.use(removePoweredBy);

  app.use(cors());

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          scriptSrc: ["'self'"],
        },
      },
    }),
  );

  app.use(
    speedLimiter({
      windowMs: 60 * 1000,
      delayAfter: 40,
      delayMs: 1500,
    }),
  );

  app.use(
    rateLimiter({
      windowMs: 60 * 1000,
      max: 60,
    }),
  );
}

export { secure };
