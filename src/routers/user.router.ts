import { Router } from "express";
import { authenticate } from "src/middlewares/authMiddleware";
import { createUserService } from "src/services/implementations/user.service.impl";
import { createUserRepository } from "src/repositories/implementations/user.repository.impl";
import { createBcryptHelper } from "src/security/bcryptHelper";
import { userController } from "src/controllers/user.controller";

const router = Router();

const service = createUserService({
  userRepository: createUserRepository(),
  BcryptHelper: createBcryptHelper(),
});
const ctrl = userController(service);

router.get("/", authenticate, ctrl.me);
router.patch("/password", authenticate, ctrl.changePassword);

export default router;
