import { Router } from "express";
import { authenticate } from "src/application/presentation/middlewares/authMiddleware";
import { paymentController } from "src/application/presentation/controllers/payment.controller";
import { createPaymentRepository } from "src/implementation/repository/payment/payment.repository.impl";
import { createPortfolioRepository } from "src/implementation/repository/portfolio/portfolio.repository.impl";
import { createInvPlanRepository } from "src/implementation/repository/investmentProfile/invPlan.repository.impl";
import { PaymentService } from "src/application/service/payment/interface/payment.service";
import * as PaymentUsecases from "src/implementation/service/payment";

const router = Router();

const deps = {
  paymentRepository: createPaymentRepository(),
  portfolioRepository: createPortfolioRepository(),
  invPlanRepository: createInvPlanRepository(),
};

const service: PaymentService = {
  getInvestmentProgress: PaymentUsecases.getInvestmentProgress(deps),
  getInvestmentPayments: PaymentUsecases.getInvestmentPayments(deps),
  recordPayment: PaymentUsecases.recordPayment(deps),
  generateSchedulesForPlan: PaymentUsecases.generateSchedulesForPlan(deps),
};

const ctrl = paymentController(service);

// 납입 관련
router.get("/progress", authenticate, ctrl.getInvestmentProgress);
router.get("/payments", authenticate, ctrl.getInvestmentPayments);
router.post("/payments", authenticate, ctrl.recordInvestmentPayment);

export default router;
