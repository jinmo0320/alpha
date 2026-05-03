import { Router } from "express";
import module from "src/modules/auth.module";

const router = Router();

router.post("/register", module.register);
router.post("/login", module.login);
router.post("/verification/send", module.sendVerificationCode);
router.post("/verification/verify", module.checkVerificationCode);
router.post("/forgot-password/send", module.sendForgotCode);
router.post("/forgot-password/verify", module.checkForgotCode);
router.post("/reset-password", module.resetPassword);
router.post("/refresh", module.refreshToken);

export default router;
