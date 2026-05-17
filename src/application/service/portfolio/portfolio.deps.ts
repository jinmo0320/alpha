import { CategoryRepository } from "src/application/repository/portfolio/interface/category.repository";
import { PortfolioRepository } from "../../repository/portfolio/interface/portfolio.repository";
import { PlanRepository } from "src/application/repository/plan/plan.repository";

export type PortfolioDeps = {
  portfolioRepository: PortfolioRepository;
  planRepository: PlanRepository;
  categoryRepository: CategoryRepository;
};
