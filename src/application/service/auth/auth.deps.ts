import { AuthRepository } from "src/application/repository/auth/auth.repository";
import { UserRepository } from "src/application/repository/user/user.repository";
import { BcryptHelper } from "src/externals/bcrypt/bcryptHelper";
import { EmailSender } from "src/externals/email/emailSender";
import { TokenProvider } from "src/externals/token/tokenProvider";

export type AuthDeps = {
  userRepository: UserRepository;
  authRepository: AuthRepository;
  TokenProvider: TokenProvider;
  EmailSender: EmailSender;
  BcryptHelper: BcryptHelper;
};
