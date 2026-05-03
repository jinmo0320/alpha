import { InvPlanRepository } from "src/application/repository/investmentProfile/interface/invPlan.repository";
import { PortfolioRepository } from "src/application/repository/portfolio/interface/portfolio.repository";

export type PortfolioDeps = {
  portfolioRepository: PortfolioRepository;
  invPlanRepository: InvPlanRepository;
};
