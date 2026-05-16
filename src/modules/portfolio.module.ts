import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authenticate";
import { loadPortfolio } from "../application/presentation/middlewares/portfolioMiddleware";
import { portfolioController } from "../application/presentation/controllers/portfolio.controller";
import { createPortfolioRepository } from "../application/repository/portfolio/implementation/portfolio.repository.impl";
import { createPortfolioService } from "../application/service/portfolio/portfolio.service.impl";
import { Portfolio } from "src/application/model/portfolio.model";
import { PortfolioDeps } from "src/application/service/portfolio/portfolio.deps";
import { createPlanRepository } from "src/application/repository/plan/plan.repository.impl";
import { createCategoryRepository } from "src/application/repository/portfolio/implementation/category.repository.impl";

const router = Router();

const deps: PortfolioDeps = {
  portfolioRepository: createPortfolioRepository(),
  planRepository: createPlanRepository(),
  categoryRepository: createCategoryRepository(),
};
const service = createPortfolioService(deps);
const ctrl = portfolioController(service);

router.get("/", authenticate,);
router.


export default router;
