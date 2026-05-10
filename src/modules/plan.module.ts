import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authMiddleware";
import { planController } from "../application/presentation/controllers/plan.controller";
import { createPlanRepository } from "../application/repository/plan/plan.repository.impl";
import { createPlanService } from "../application/service/plan/plan.service.impl";

const router = Router();

const service = createPlanService({
  planRepository: createPlanRepository(),
});

const ctrl = planController(service);

router.get("/", authenticate, ctrl.getPlan);
router.post("/", authenticate, ctrl.createPlan);

export default router;
