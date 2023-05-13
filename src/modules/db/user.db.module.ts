import { UserModel } from '../../models';
import { UserCreateDbModuleDto } from './dto';

class UserDbModule {
  constructor(private userModel: typeof UserModel) {}

  public async createUser({ email, password }: UserCreateDbModuleDto) {
    return this.userModel.create({ email, password });
  }

  public async findUser(email: string) {
    return this.userModel.findOne({ email });
  }
}

const userDbModule = new UserDbModule(UserModel);
export { userDbModule, UserDbModule };
