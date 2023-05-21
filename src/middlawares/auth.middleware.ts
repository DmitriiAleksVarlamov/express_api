import passport, { Passport } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authService, AuthService } from '../services/auth.service';
import config from 'config';
import { Sessions } from '../constants';

class AuthMiddleware {
  constructor(private passport: Passport, private authService: AuthService) {
    this.createBearerStrategy();
  }

  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('auth.jwtKey'),
    passReqToCallback: true,
  };

  public get bearerStrategy() {
    return this.passport.authenticate('jwt', { session: false });
  }

  private createBearerStrategy() {
    this.passport.use(
      new Strategy(this.jwtOptions, async (req, jwtPayload, done) => {
        try {
          const user = await this.authService.findUser(jwtPayload.email);

          const device = this.authService.getSessionValue(
            req,
            Sessions.userAgent,
          );

          const isContainDevice = this.authService.checkDevices(
            user.devices,
            device,
          );

          if (isContainDevice) {
            return done(null, user);
          }

          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      }),
    );
  }
}

const authMiddleware = new AuthMiddleware(passport, authService);

export { authMiddleware, AuthMiddleware };
