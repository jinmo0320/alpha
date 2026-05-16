import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authenticate";
import { planController } from "../application/presentation/controllers/plan.controller";
import { createPlanRepository } from "../application/repository/plan/plan.repository.impl";
import { createPlanService } from "../application/service/plan/plan.service.impl";
import { PlanDeps } from "src/application/service/plan/plan.deps";
import { authorize } from "src/application/presentation/middlewares/authorize";

const router = Router();

const deps: PlanDeps = {
  planRepository: createPlanRepository(),
};
const service = createPlanService(deps);
const ctrl = planController(service);

router.get("/", authenticate, authorize, ctrl.getPlan);
router.post("/", authenticate, authorize, ctrl.createPlan);
router.get("/all", authenticate, authorize, ctrl.getAllPlans);
router.post("/update", authenticate, authorize, ctrl.updatePlan);
router.patch("/date", authenticate, authorize, ctrl.setDate);

export default router;
