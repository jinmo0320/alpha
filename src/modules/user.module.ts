import { Router } from "express";
import { authenticate } from "src/application/presentation/middlewares/authMiddleware";
import { createUserRepository } from "src/implementation/repository/user/user.repository.impl";
import { createBcryptHelper } from "src/security/bcryptHelper";
import { userController } from "src/application/presentation/controllers/user.controller";
import { UserService } from "src/application/service/user/interface/user.service";
import * as UserUsecases from "src/implementation/service/user";

const router = Router();

const deps = {
  userRepository: createUserRepository(),
  BcryptHelper: createBcryptHelper(),
};

const service: UserService = {
  me: UserUsecases.createMe(deps),
  changePassword: UserUsecases.createChangePassword(deps),
};
const ctrl = userController(service);

router.get("/", authenticate, ctrl.me);
router.patch("/password", authenticate, ctrl.changePassword);

export default router;
