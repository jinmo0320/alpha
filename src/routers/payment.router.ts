import { Router } from "express";
import { authenticate } from "src/middlewares/authMiddleware";
import { paymentController } from "../controllers/payment.controller";
import { createPaymentService } from "src/services/implementations/payment.service.impl";
import { createPaymentRepository } from "src/repositories/implementations/payment.repository.impl";
import { createPortfolioRepository } from "src/repositories/implementations/portfolio.repository.impl";
import { createInvPlanRepository } from "src/repositories/implementations/invPlan.repository.impl";

const router = Router();

const ctrl = paymentController(
  createPaymentService({
    paymentRepository: createPaymentRepository(),
    portfolioRepository: createPortfolioRepository(),
    invPlanRepository: createInvPlanRepository(),
  }),
);

// 납입 관련
router.get("/progress", authenticate, ctrl.getInvestmentProgress);
router.get("/payments", authenticate, ctrl.getInvestmentPayments);
router.post("/payments", authenticate, ctrl.recordInvestmentPayment);

export default router;
