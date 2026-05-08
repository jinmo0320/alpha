import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authMiddleware";
import { loadPortfolio } from "../application/presentation/middlewares/portfolioMiddleware";
import { portfolioController } from "../application/presentation/controllers/portfolio.controller";
import { createPortfolioRepository } from "../application/repository/portfolio/implementation/portfolio.repository.impl";
import { createPortfolioService } from "../application/service/portfolio/portfolio.service.impl";

const router = Router();

const service = createPortfolioService({
  portfolioRepository: createPortfolioRepository(),
});
const ctrl = portfolioController(service);

const portFolioLoader = loadPortfolio(service);

// === 전체 & 추천 ===
router.get("/", authenticate, ctrl.getMyPortfolio);
router.get("/recommendations", authenticate, ctrl.getRecommendations);
router.post("/create-from-preset", authenticate, ctrl.createFromPreset);

// === 자산군 ===
router.get(
  "/categories/available",
  authenticate,
  portFolioLoader,
  ctrl.getAvailableCategories,
);
router.get("/categories", authenticate, portFolioLoader, ctrl.getCategories);
router.put(
  "/categories",
  authenticate,
  portFolioLoader,
  ctrl.updateCategoryPortions,
);
router.delete(
  "/categories/:categoryId",
  authenticate,
  portFolioLoader,
  ctrl.deleteCategory,
);

// == 자산군 내 하위 자산
router.get(
  "/categories/:categoryId/items/available",
  authenticate,
  ctrl.getAvailableItems,
);
router.get(
  "/categories/:categoryId/items",
  authenticate,
  portFolioLoader,
  ctrl.getItemsRelative,
);
router.put(
  "/categories/:categoryId/items",
  authenticate,
  portFolioLoader,
  ctrl.updateItemRelativePortions,
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

// Category/item creation and detail editing are paused until custom asset ownership is rebuilt.

export default router;
