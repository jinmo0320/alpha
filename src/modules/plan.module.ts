import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authMiddleware";
import { planController } from "../application/presentation/controllers/plan.controller";
import { createPlanRepository } from "../application/repository/plan/plan.repository.impl";
import { createPlanService } from "../application/service/plan/implementation/plan.service.impl";

const router = Router();

const service = createPlanService({
  planRepository: createPlanRepository(),
});

const ctrl = planController(service);

// Payment schedule generation is intentionally paused until payment flow is rebuilt.
router.get("/", authenticate, ctrl.getPlan);
router.post("/", authenticate, ctrl.createPlan);
router.put("/", authenticate, ctrl.updatePlan);
router.patch("/clear", authenticate, ctrl.clearPlan);

export default router;
