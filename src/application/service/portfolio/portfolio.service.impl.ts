import { PortfolioDeps } from "./portfolio.deps";
import { PortfolioService } from "./portfolio.service";

const defaultRecommendationTargetReturn = 5;

export const createPortfolioService = ({
  portfolioRepository,
}: PortfolioDeps): PortfolioService => ({});
