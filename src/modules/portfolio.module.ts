import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authenticate";
import { portfolioController } from "../application/presentation/controllers/portfolio.controller";
import { createPortfolioRepository } from "../application/repository/portfolio/implementation/portfolio.repository.impl";
import { createPortfolioService } from "../application/service/portfolio/portfolio.service.impl";
import { PortfolioDeps } from "src/application/service/portfolio/portfolio.deps";
import { createPlanRepository } from "src/application/repository/plan/plan.repository.impl";
import { createCategoryRepository } from "src/application/repository/portfolio/implementation/category.repository.impl";
import { authorize } from "src/application/presentation/middlewares/authorize";

const router = Router({ mergeParams: true });

const deps: PortfolioDeps = {
  portfolioRepository: createPortfolioRepository(),
  planRepository: createPlanRepository(),
  categoryRepository: createCategoryRepository(),
};
const service = createPortfolioService(deps);
const ctrl = portfolioController(service);

router.get("/all", authenticate, authorize, ctrl.getAllPortfolios);
router.get("/recommend", authenticate, authorize, ctrl.getRecommendations);
router.post(
  "/create-from-preset",
  authenticate,
  authorize,
  ctrl.createFromPreset,
);
router.post("/items", authenticate, authorize, ctrl.setPortfolioItems);
router.post(
  "/category/available",
  authenticate,
  authorize,
  ctrl.getAvailableCategories,
);
router.post("/item/available", authenticate, authorize, ctrl.getAvailableItems);

export default router;
