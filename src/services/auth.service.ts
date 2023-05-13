import { UserModel } from '../models';
import { userDbModule, UserDbModule } from '../modules/db/user.db.module';
import { UserCheckDbModuleDto, UserCreateDbModuleDto } from '../modules/db/dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config, { IConfig } from 'config';
import { MatchPasswordsError } from '../errors/match-passwords-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { StatusCode } from '../constants';
import { MongoServerError } from '../errors/mongo-server-error';

class AuthService {
  constructor(
    private userModel: typeof UserModel,
    private userDbModule: UserDbModule,
    private config: IConfig,
  ) {}

  public async findUser(email) {
    return this.userDbModule.findUser(email);
  }

  public async createUser({ email, password }: UserCreateDbModuleDto) {
    try {
      return await this.userDbModule.createUser({ email, password });
    } catch (error) {
      throw new MongoServerError(error.message, StatusCode.BadRequest);
    }
  }

  public async checkUser({ password, email }: UserCheckDbModuleDto) {
    const user = await this.userDbModule.findUser(email);

    if (!user) {
      throw new UserNotFoundError('user not found', StatusCode.BadRequest);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      const token = jwt.sign(
        { password, email },
        this.config.get('auth.jwtKey'),
        {
          expiresIn: '1h',
        },
      );

      return { token };
    }

    throw new MatchPasswordsError('wrong password', StatusCode.BadRequest);
  }
}

const authService = new AuthService(UserModel, userDbModule, config);

export { authService, AuthService };
