import { Router } from "express";
import { authenticate } from "src/application/presentation/middlewares/authMiddleware";
import { invProfileController } from "src/application/presentation/controllers/invProfile.controller";
import { createInvPlanRepository } from "src/implementation/repository/investmentProfile/invPlan.repository.impl";
import { createUserRepository } from "src/implementation/repository/user/user.repository.impl";
import { createPaymentRepository } from "src/implementation/repository/payment/payment.repository.impl";
import { createPortfolioRepository } from "src/implementation/repository/portfolio/portfolio.repository.impl";
import { InvProfileService } from "src/application/service/investmentProfile/interface/invProfile.service";
import { PaymentService } from "src/application/service/payment/interface/payment.service";
import * as InvProfileUsecases from "src/implementation/service/investmentProfile";
import * as PaymentUsecases from "src/implementation/service/payment";

const router = Router();

const invPlanRepo = createInvPlanRepository();
const portfolioRepo = createPortfolioRepository();
const paymentDeps = {
  paymentRepository: createPaymentRepository(),
  portfolioRepository: portfolioRepo,
  invPlanRepository: invPlanRepo,
};

const paymentService: PaymentService = {
  getInvestmentProgress: PaymentUsecases.getInvestmentProgress(paymentDeps),
  getInvestmentPayments: PaymentUsecases.getInvestmentPayments(paymentDeps),
  recordPayment: PaymentUsecases.recordPayment(paymentDeps),
  generateSchedulesForPlan:
    PaymentUsecases.generateSchedulesForPlan(paymentDeps),
};

const deps = {
  invPlanRepository: invPlanRepo,
  userRepository: createUserRepository(),
  paymentService,
};

const service: InvProfileService = {
  getRiskType: InvProfileUsecases.getRiskType(deps),
  assessRiskType: InvProfileUsecases.assessRiskType(deps),
  clearRiskType: InvProfileUsecases.clearRiskType(deps),
  getPlan: InvProfileUsecases.getPlan(deps),
  createPlan: InvProfileUsecases.createPlan(deps),
  updatePlan: InvProfileUsecases.updatePlan(deps),
  clearPlan: InvProfileUsecases.clearPlan(deps),
};

const ctrl = invProfileController(service);

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
