import passport, { Passport } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authService, AuthService } from '../services/auth.service';
import config from 'config';

class AuthMiddleware {
  constructor(private passport: Passport, private authService: AuthService) {
    this.createBearerStrategy();
  }

  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('auth.jwtKey'),
  };

  public get bearerStrategy() {
    return this.passport.authenticate('jwt', { session: false });
  }

  private createBearerStrategy() {
    this.passport.use(
      new Strategy(this.jwtOptions, async (jwtPayload, done) => {
        try {
          const user = await this.authService.findUser(jwtPayload.email);

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }),
    );
  }
}

const authMiddleware = new AuthMiddleware(passport, authService);

export { authMiddleware, AuthMiddleware };
