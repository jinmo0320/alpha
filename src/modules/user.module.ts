import { Router } from "express";
import { authenticate } from "src/application/presentation/middlewares/authenticate";
import { createUserRepository } from "src/application/repository/user/user.repository.impl";
import { createBcryptHelper } from "src/externals/bcrypt/bcryptHelper.impl";
import { userController } from "src/application/presentation/controllers/user.controller";
import { UserService } from "src/application/service/user/user.service";
import { UserDeps } from "src/application/service/user/user.deps";
import { createAuthService } from "src/application/service/auth/auth.service.impl";
import { createUserService } from "src/application/service/user/user.service.impl";

const router = Router();

const deps: UserDeps = {
  userRepository: createUserRepository(),
  BcryptHelper: createBcryptHelper(),
};

const service: UserService = createUserService(deps);
const ctrl = userController(service);

router.get("/", authenticate, ctrl.me);
router.patch("/password", authenticate, ctrl.changePassword);
router.patch("/name", authenticate, ctrl.changeName);
router.post("/risk", authenticate, ctrl.assessInvestmentRisk);
router.patch("/risk", authenticate, ctrl.clearInvestmentRisk);

export default router;
