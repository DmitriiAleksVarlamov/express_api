class UserCreateDbModuleDto {
  password: string;
  email: string;
}

class UserCheckDbModuleDto {
  password: string;
  email: string;
}

export { UserCreateDbModuleDto, UserCheckDbModuleDto };
