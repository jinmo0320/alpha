import { createUserRepository } from "src/implementation/repository/user/user.repository.impl";
import { createAuthRepository } from "src/implementation/repository/auth/auth.repository.impl";
import { createEmailSender } from "src/providers/implementations/emailSender.impl";
import { createTokenProvider } from "src/security/tokenProvider";
import { createBcryptHelper } from "src/security/bcryptHelper";

import { AuthService } from "src/application/service/auth/interface/auth.service";
import * as AuthUsecases from "src/implementation/service/auth";
import { authContoller } from "src/application/presentation/controllers/auth.controller";

const deps = {
  userRepository: createUserRepository(),
  authRepository: createAuthRepository(),
  TokenProvider: createTokenProvider(),
  EmailSender: createEmailSender(),
  BcryptHelper: createBcryptHelper(),
};

const service: AuthService = {
  register: AuthUsecases.createRegister(deps),
  login: AuthUsecases.createLogin(deps),
  sendVerificationCode: AuthUsecases.createSendVerificationCode(deps),
  checkVerificationCode: AuthUsecases.createCheckVerificationCode(deps),
  sendForgotCode: AuthUsecases.createSendForgotCode(deps),
  checkForgotCode: AuthUsecases.createCheckForgotCode(deps),
  resetPassword: AuthUsecases.createResetPassword(deps),
  refreshToken: AuthUsecases.createRefreshToken(deps),
};

const ctrl = authContoller(service);

export default ctrl;
