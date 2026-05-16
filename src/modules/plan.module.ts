import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authMiddleware";
import { planController } from "../application/presentation/controllers/plan.controller";
import { createPlanRepository } from "../application/repository/plan/plan.repository.impl";
import { createPlanService } from "../application/service/plan/plan.service.impl";
import { PlanDeps } from "src/application/service/plan/plan.deps";

const router = Router();

const deps: PlanDeps = {
  planRepository: createPlanRepository(),
};
const service = createPlanService(deps);
const ctrl = planController(service);

router.get("/", authenticate, ctrl.getPlan);
router.post("/", authenticate, ctrl.createPlan);
router.get("/all", authenticate, ctrl.getAllPlans);
router.post("/update", authenticate, ctrl.updatePlan);
router.patch("/date", authenticate, ctrl.setDate);

export default router;
