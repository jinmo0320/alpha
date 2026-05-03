import { Router } from "express";

import { createUserRepository } from "src/application/repository/user/user.repository.impl";
import { createAuthRepository } from "src/implementation/repository/auth/auth.repository.impl";
import { createEmailSender } from "src/externals/email/emailSender.impl";
import { createTokenProvider } from "src/externals/token/tokenProvider.impl";
import { createBcryptHelper } from "src/externals/bcrypt/bcryptHelper.impl";

import { AuthService } from "src/application/service/auth/interface/auth.service";
import * as AuthUsecases from "src/implementation/service/auth";
import { authContoller } from "src/application/presentation/controllers/auth.controller";

const router = Router();

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

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/verification/send", ctrl.sendVerificationCode);
router.post("/verification/verify", ctrl.checkVerificationCode);
router.post("/forgot-password/send", ctrl.sendForgotCode);
router.post("/forgot-password/verify", ctrl.checkForgotCode);
router.post("/reset-password", ctrl.resetPassword);
router.post("/refresh", ctrl.refreshToken);

export default router;
