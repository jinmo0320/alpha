import { InvPlanRepository } from "src/application/repository/investmentProfile/interface/invPlan.repository";
import { PaymentRepository } from "src/application/repository/payment/interface/payment.repository";
import { PortfolioRepository } from "src/application/repository/portfolio/interface/portfolio.repository";

export type PaymentDeps = {
  paymentRepository: PaymentRepository;
  portfolioRepository: PortfolioRepository;
  invPlanRepository: InvPlanRepository;
};
