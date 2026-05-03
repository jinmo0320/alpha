import { AuthRepository } from "src/application/repository/auth/interface/auth.repository";
import { UserRepository } from "src/application/repository/user/interface/user.repository";
import {
  BcryptHelper,
  EmailSender,
  TokenProvider,
} from "src/providers/interfaces/auth.external";

export type AuthDeps = {
  userRepository: UserRepository;
  authRepository: AuthRepository;
  TokenProvider: TokenProvider;
  EmailSender: EmailSender;
  BcryptHelper: BcryptHelper;
};
