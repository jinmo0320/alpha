import { PortfolioRepository } from "src/repositories/interfaces/portfolio.repository";
import { InvPlanRepository } from "src/repositories/interfaces/invPlan.repository";
import { PortfolioService } from "src/services/interfaces/portfolio.service";

import * as Usecases from "../usecases/portfolio";

export type PortfolioDeps = {
  portfolioRepository: PortfolioRepository;
  invPlanRepository: InvPlanRepository;
};

export const createPortfolioService = (deps: PortfolioDeps): PortfolioService => ({
  getPortfolio: Usecases.createGetPortfolio(deps),
  getRecommendations: Usecases.createGetRecommendations(deps),
  createFromPreset: Usecases.createCreateFromPreset(deps),

  getCategories: Usecases.createGetCategories(deps),
  updateCategoryPortions: Usecases.createUpdateCategoryPortions(deps),
  addCategory: Usecases.createAddCategory(deps),
  deleteCategory: Usecases.createDeleteCategory(deps),
  updateCategoryInfo: Usecases.createUpdateCategoryInfo(deps),
  getAvailableCategories: Usecases.createGetAvailableCategories(deps),

  getItemsAbsolute: Usecases.createGetItemsAbsolute(deps),
  getItemsRelative: Usecases.createGetItemsRelative(deps),
  updateItemAbsolutePortions: Usecases.createUpdateItemAbsolutePortions(deps),
  updateItemRelativePortions: Usecases.createUpdateItemRelativePortions(deps),
  addItem: Usecases.createAddItem(deps),
  deleteItem: Usecases.createDeleteItem(deps),
  updateItemInfo: Usecases.createUpdateItemInfo(deps),
  getAvailableItems: Usecases.createGetAvailableItems(deps),
});
