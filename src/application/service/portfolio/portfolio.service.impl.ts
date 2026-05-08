import { PortfolioDeps } from "./portfolio.deps";
import { PortfolioService } from "./portfolio.service";

const defaultRecommendationTargetReturn = 5;

export const createPortfolioService = ({
  portfolioRepository,
}: PortfolioDeps): PortfolioService => ({
  getPortfolio: async (userId) => {
    const portfolios = await portfolioRepository.getAllPortfolios(userId);
    return portfolios[0] ?? null;
  },

  getRecommendations: async () => {
    // Plan-based recommendation wiring is paused until the plan flow settles.
    return (
      (await portfolioRepository.getPreset(defaultRecommendationTargetReturn)) ??
      []
    );
  },

  createFromPreset: async ({ userId, presetCode }) => {
    await portfolioRepository.createPortfolioFromPreset(userId, presetCode);
  },

  getCategories: async (portfolioId) =>
    portfolioRepository.getCategories(portfolioId),

  updateCategoryPortions: async ({ portfolioId, portions }) => {
    await portfolioRepository.updateCategoryPortions(portfolioId, portions);
  },

  deleteCategory: async ({ portfolioId, categoryId }) => {
    await portfolioRepository.deleteCategory(portfolioId, categoryId);
  },

  getAvailableCategories: async (portfolioId) =>
    portfolioRepository.getAvailableCategories(portfolioId),

  getItemsAbsolute: async (portfolioId) =>
    portfolioRepository.getItems(portfolioId),

  getItemsRelative: async ({ portfolioId, categoryId }) =>
    portfolioRepository.getItemsByCategory(categoryId, portfolioId),

  updateItemAbsolutePortions: async ({ portfolioId, portions }) => {
    await portfolioRepository.updateItemAbsolutePortions(portfolioId, portions);
  },

  updateItemRelativePortions: async ({ portfolioId, categoryId, portions }) => {
    await portfolioRepository.updateItemRelativePortions(
      categoryId,
      portions,
      portfolioId,
    );
  },

  deleteItem: async ({ portfolioId, itemId }) => {
    await portfolioRepository.deleteItem(portfolioId, itemId);
  },

  getAvailableItems: async ({ categoryId }) =>
    portfolioRepository.getAvailableItems(categoryId),
});
