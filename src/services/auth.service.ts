import { UserModel } from '../models';
import { userDbModule, UserDbModule } from '../modules/db/user.db.module';
import { UserCheckDbModuleDto, UserCreateDbModuleDto } from '../modules/db/dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config, { IConfig } from 'config';
import { MatchPasswordsError } from '../errors/match-passwords-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { Sessions, StatusCode } from '../constants';
import { MongoServerError } from '../errors/mongo-server-error';
import { Request } from 'express';
import { ExtractUserAgentError } from '../errors/extract-user-agent-error';

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

  public async checkUser({ password, email, req }: UserCheckDbModuleDto) {
    const user = await this.userDbModule.findUser(email);

    if (!user) {
      throw new UserNotFoundError('user not found', StatusCode.BadRequest);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      const token = jwt.sign({ email }, this.config.get('auth.jwtKey'), {
        expiresIn: '1h',
      });

      const sessionDevice = this.getSessionValue(req, Sessions.userAgent);
      const isGadgetExist = this.checkDevices(user.devices, sessionDevice);

      if (!isGadgetExist) {
        const agentHash = await this.setSessionValue(req, Sessions.userAgent);

        await this.userDbModule.updateGadget(email, agentHash);
      }

      return { token };
    }

    throw new MatchPasswordsError('wrong password', StatusCode.BadRequest);
  }

  private async setSessionValue(req: Request, name: string): Promise<string> {
    const userAgent = req.headers['user-agent'];

    if (!userAgent) {
      throw new ExtractUserAgentError('Cannot extract user agent string');
    }

    const userAgentHash: string = await bcrypt.hash(userAgent, 5);

    req.session[name] = userAgentHash;

    return userAgentHash;
  }

  public checkDevices(devices: string[], currentDevice: string): boolean {
    const index = devices.indexOf(currentDevice);

    return Boolean(~index);
  }

  public getSessionValue(req: Request, name: string): string {
    return req.session[name];
  }

  public async removeAuthorizedDevice(req: Request, email: string) {
    const sessionValue = this.getSessionValue(req, Sessions.userAgent);
    const user = await this.findUser(email);
    const authorizedDevices = this.filterDevices(user.devices, sessionValue);

    await this.userDbModule.updateAuthorizedDevices(email, authorizedDevices);
  }

  private filterDevices(devices: string[], currentDevice: string): string[] {
    return devices.filter((device) => device !== currentDevice);
  }
}

const authService = new AuthService(UserModel, userDbModule, config);

export { authService, AuthService };
