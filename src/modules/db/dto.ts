import { Request } from 'express';

class UserCreateDbModuleDto {
  password: string;
  email: string;
}

class UserCheckDbModuleDto {
  password: string;
  email: string;
  req: Request;
}

export { UserCreateDbModuleDto, UserCheckDbModuleDto };
