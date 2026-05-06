import { Router } from "express";

import { createUserRepository } from "src/application/repository/user/user.repository.impl";
import { createAuthRepository } from "src/application/repository/auth/auth.repository.impl";
import { createEmailSender } from "src/externals/email/emailSender.impl";
import { createTokenProvider } from "src/externals/token/tokenProvider.impl";
import { createBcryptHelper } from "src/externals/bcrypt/bcryptHelper.impl";

import { AuthDeps } from "src/application/service/auth/interface/auth.deps";
import { AuthService } from "src/application/service/auth/interface/auth.service";
import { createAuthService } from "src/application/service/auth/implementation/auth.service.impl";
import { authContoller } from "src/application/presentation/controllers/auth.controller";

const router = Router();

const deps: AuthDeps = {
  userRepository: createUserRepository(),
  authRepository: createAuthRepository(),
  TokenProvider: createTokenProvider(),
  EmailSender: createEmailSender(),
  BcryptHelper: createBcryptHelper(),
};
const service: AuthService = createAuthService(deps);
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
