import { UserRepository } from "src/repositories/interfaces/user.repository";
import { AuthRepository } from "src/repositories/interfaces/auth.repository";
import {
  TokenProvider,
  EmailSender,
  BcryptHelper,
} from "src/providers/interfaces/auth.external";
import { AuthService } from "src/services/interfaces/auth.service";

import * as Usecases from "../usecases/auth";

export type AuthDeps = {
  userRepository: UserRepository;
  authRepository: AuthRepository;
  TokenProvider: TokenProvider;
  EmailSender: EmailSender;
  BcryptHelper: BcryptHelper;
};

export const createAuthService = (deps: AuthDeps): AuthService => ({
  register: Usecases.createRegister(deps),
  login: Usecases.createLogin(deps),
  sendVerificationCode: Usecases.createSendVerificationCode(deps),
  checkVerificationCode: Usecases.createCheckVerificationCode(deps),
  sendForgotCode: Usecases.createSendForgotCode(deps),
  checkForgotCode: Usecases.createCheckForgotCode(deps),
  resetPassword: Usecases.createResetPassword(deps),
  refreshToken: Usecases.createRefreshToken(deps),
});
