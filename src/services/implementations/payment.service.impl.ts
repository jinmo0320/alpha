import { PaymentRepository } from "src/repositories/interfaces/payment.repository";
import { PortfolioRepository } from "src/repositories/interfaces/portfolio.repository";
import { InvPlanRepository } from "src/repositories/interfaces/invPlan.repository";
import { PaymentService } from "src/services/interfaces/payment.service";
import * as Usecases from "../usecases/payment";

export type PaymentDeps = {
  paymentRepository: PaymentRepository;
  portfolioRepository: PortfolioRepository;
  invPlanRepository: InvPlanRepository;
};

export const createPaymentService = (deps: PaymentDeps): PaymentService => ({
  getInvestmentProgress: Usecases.getInvestmentProgress(deps),
  getInvestmentPayments: Usecases.getInvestmentPayments(deps),
  recordPayment: Usecases.recordPayment(deps),
  generateSchedulesForPlan: Usecases.generateSchedulesForPlan(deps),
});
