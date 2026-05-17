import { UserRepository } from "src/application/repository/user/user.repository";
import { BcryptHelper } from "src/externals/bcrypt/bcryptHelper";

export type UserDeps = {
  userRepository: UserRepository;
  BcryptHelper: BcryptHelper;
};
