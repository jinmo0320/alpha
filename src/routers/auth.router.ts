import { Router } from "express";

import { createUserRepository } from "src/repositories/implementations/user.repository.impl";
import { createAuthRepository } from "src/repositories/implementations/auth.repository.impl";
import { createEmailSender } from "src/providers/implementations/emailSender.impl";
import { createTokenProvider } from "src/security/tokenProvider";
import { createBcryptHelper } from "src/security/bcryptHelper";

import { createAuthService } from "src/services/implementations/auth.service.impl";
import { authContoller } from "../controllers/auth.controller";

const router = Router();

const service = createAuthService({
  userRepository: createUserRepository(),
  authRepository: createAuthRepository(),
  TokenProvider: createTokenProvider(),
  EmailSender: createEmailSender(),
  BcryptHelper: createBcryptHelper(),
});
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
