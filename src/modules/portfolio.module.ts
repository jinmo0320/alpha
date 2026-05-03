import { Router } from "express";
import { authenticate } from "src/application/presentation/middlewares/authMiddleware";
import { loadPortfolio } from "src/application/presentation/middlewares/portfolioMiddleware";
import { portfolioController } from "src/application/presentation/controllers/portfolio.controller";
import { createPortfolioRepository } from "src/implementation/repository/portfolio/portfolio.repository.impl";
import { createInvPlanRepository } from "src/implementation/repository/investmentProfile/invPlan.repository.impl";
import { PortfolioService } from "src/application/service/portfolio/interface/portfolio.service";
import * as PortfolioUsecases from "src/implementation/service/portfolio";

const router = Router();

const deps = {
  portfolioRepository: createPortfolioRepository(),
  invPlanRepository: createInvPlanRepository(),
};

const service: PortfolioService = {
  getPortfolio: PortfolioUsecases.createGetPortfolio(deps),
  getRecommendations: PortfolioUsecases.createGetRecommendations(deps),
  createFromPreset: PortfolioUsecases.createCreateFromPreset(deps),
  getCategories: PortfolioUsecases.createGetCategories(deps),
  updateCategoryPortions: PortfolioUsecases.createUpdateCategoryPortions(deps),
  addCategory: PortfolioUsecases.createAddCategory(deps),
  deleteCategory: PortfolioUsecases.createDeleteCategory(deps),
  updateCategoryInfo: PortfolioUsecases.createUpdateCategoryInfo(deps),
  getAvailableCategories: PortfolioUsecases.createGetAvailableCategories(deps),
  getItemsAbsolute: PortfolioUsecases.createGetItemsAbsolute(deps),
  getItemsRelative: PortfolioUsecases.createGetItemsRelative(deps),
  updateItemAbsolutePortions:
    PortfolioUsecases.createUpdateItemAbsolutePortions(deps),
  updateItemRelativePortions:
    PortfolioUsecases.createUpdateItemRelativePortions(deps),
  addItem: PortfolioUsecases.createAddItem(deps),
  deleteItem: PortfolioUsecases.createDeleteItem(deps),
  updateItemInfo: PortfolioUsecases.createUpdateItemInfo(deps),
  getAvailableItems: PortfolioUsecases.createGetAvailableItems(deps),
};
const ctrl = portfolioController(service);

const portFolioLoader = loadPortfolio(service);

// === 전체 & 추천 ===
router.get("/", authenticate, ctrl.getMyPortfolio);
router.get("/recommendations", authenticate, ctrl.getRecommendations);
router.post("/create-from-preset", authenticate, ctrl.createFromPreset);

// === 자산군 ===
router.get("/categories", authenticate, portFolioLoader, ctrl.getCategories);
router.put(
  "/categories",
  authenticate,
  portFolioLoader,
  ctrl.updateCategoryPortions,
);
router.post("/categories", authenticate, portFolioLoader, ctrl.addCategory);
router.delete(
  "/categories/:categoryId",
  authenticate,
  portFolioLoader,
  ctrl.deleteCategory,
);
router.patch("/categories/:categoryId", authenticate, ctrl.patchCategory);
router.get("/categories/available", authenticate, ctrl.getAvailableCategories);
router.post(
  "/categories/available",
  authenticate,
  portFolioLoader,
  ctrl.addCategory,
);

// == 자산군 내 하위 자산
router.get(
  "/categories/:categoryId/items",
  authenticate,
  ctrl.getItemsRelative,
);
router.put(
  "/categories/:categoryId/items",
  authenticate,
  ctrl.updateItemRelativePortions,
);
router.post("/categories/:categoryId/items", authenticate, ctrl.addItem);
router.get(
  "/categories/:categoryId/items/available",
  authenticate,
  ctrl.getAvailableItems,
);
router.post(
  "/categories/:categoryId/items/available",
  authenticate,
  ctrl.addItem,
);

// === 개별 하위 자산 ===
router.get("/items", authenticate, portFolioLoader, ctrl.getItemsAbsolute);
router.put(
  "/items",
  authenticate,
  portFolioLoader,
  ctrl.updateItemAbsolutePortions,
);
router.delete("/items/:itemId", authenticate, portFolioLoader, ctrl.deleteItem);
router.patch("/items/:itemId", authenticate, ctrl.patchItem);

export default router;
