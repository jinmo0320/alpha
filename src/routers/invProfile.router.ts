import { Router } from "express";
import { authenticate } from "src/middlewares/authMiddleware";
import { invProfileController } from "src/controllers/invProfile.controller";
import { createInvProfileService } from "src/services/implementations/invProfile.service.impl";
import { createInvPlanRepository } from "src/repositories/implementations/invPlan.repository.impl";
import { createUserRepository } from "src/repositories/implementations/user.repository.impl";
import { createPaymentService } from "src/services/implementations/payment.service.impl";
import { createPaymentRepository } from "src/repositories/implementations/payment.repository.impl";
import { createPortfolioRepository } from "src/repositories/implementations/portfolio.repository.impl";

const router = Router();

const invPlanRepo = createInvPlanRepository();
const portfolioRepo = createPortfolioRepository();

const ctrl = invProfileController(
  createInvProfileService({
    invPlanRepository: invPlanRepo,
    userRepository: createUserRepository(),
    paymentService: createPaymentService({
      paymentRepository: createPaymentRepository(),
      portfolioRepository: portfolioRepo,
      invPlanRepository: invPlanRepo,
    }),
  }),
);

// 투자 성향 관련
router.get("/risk-type", authenticate, ctrl.getInvestmentRisk);
router.post("/risk-type", authenticate, ctrl.assessInvestmentRisk);
router.patch("/risk-type", authenticate, ctrl.clearInvestmentRisk);

// 투자 계획 관련
router.get("/plan", authenticate, ctrl.getInvestmentPlan);
router.post("/plan", authenticate, ctrl.createInvestmentPlan); // 플랜 만들기
router.put("/plan", authenticate, ctrl.updateInvestmentPlan);
router.patch("/plan", authenticate, ctrl.clearInvestmentPlan); // 실제로는 비활성화

export default router;
