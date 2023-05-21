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

          const sessionId = this.authService.getSessionValue(
            req,
            Sessions.userAgent,
          );

          const isGadgetExist = this.authService.checkGadgets(
            user.gadgets,
            sessionId,
          );

          if (isGadgetExist) {
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
