import { UserRepository } from "src/application/repository/user/interface/user.repository";
import { BcryptHelper } from "src/providers/interfaces/user.external";

export type UserDeps = {
  userRepository: UserRepository;
  BcryptHelper: BcryptHelper;
};
