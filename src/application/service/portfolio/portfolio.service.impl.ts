import { Domain } from "domain";
import { PortfolioDeps } from "./portfolio.deps";
import { PortfolioService } from "./portfolio.service";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { Portfolio } from "src/application/model/portfolio.model";
import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { evaluatePortfolio } from "./portfolio.logic";

export const createPortfolioService = ({
  portfolioRepository,
  planRepository,
  categoryRepository,
}: PortfolioDeps): PortfolioService => {
  const categorizeItems = async (items: Portfolio.Entity.Item[]) => {
    const categoryIds = [...new Set(items.map((item) => item.categoryId))];
    const categories = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const category = await categoryRepository.get(categoryId);
        if (!category)
          throw new DomainError(
            ErrorCodes.PORTFOLIO.INVALID_ITEMS,
            "Portfolio contains item with invalid category",
          );

        const itemsInCategory = items.filter(
          (item) => item.categoryId === categoryId,
        );

        return {
          ...category,
          portion: itemsInCategory.reduce((sum, item) => sum + item.portion, 0),
          minReturn: itemsInCategory.reduce(
            (sum, item) => sum + item.minReturn * item.portion,
            0,
          ),
          maxReturn: itemsInCategory.reduce(
            (sum, item) => sum + item.maxReturn * item.portion,
            0,
          ),
          items: itemsInCategory,
        };
      }),
    );
    return categories;
  };

  return {
    getPortfolio: async (projectId) => {
      const portfolio = await portfolioRepository.get(projectId);
      if (!portfolio) return null;

      const items = await portfolioRepository.getItemsInPortfolio(portfolio.id);
      const categories = await categorizeItems(items);

      const portfolioReturn: Portfolio.Res.Root = {
        ...portfolio,
        categories,
        status: "PENDING",
      };
      portfolioReturn.status = evaluatePortfolio(portfolioReturn);
      return portfolioReturn;
    },

    recommendPresets: async (projectId) => {
      const plan = await planRepository.get(projectId);
      if (!plan)
        throw new DomainError(ErrorCodes.PLAN.NOT_FOUND, "Plan not found");

      const presets = await portfolioRepository.getPresets(plan.expectedReturn);

      const presetsReturn: Portfolio.Res.Preset[] = await Promise.all(
        presets.map(async (preset) => {
          const items = await portfolioRepository.getItemsInPreset(preset.code);
          const categories = await categorizeItems(items);
          const presetReturn: Portfolio.Res.Preset = {
            ...preset,
            categories,
          };
          return presetReturn;
        }),
      );
      return presetsReturn;
    },

    createFromPreset: async (req) => {
      const portfolio = await portfolioRepository.createFromPreset(req);
      const items = await portfolioRepository.getItemsInPortfolio(portfolio.id);
      const categories = await categorizeItems(items);

      const portfolioReturn: Portfolio.Res.Root = {
        ...portfolio,
        categories,
        status: "PENDING",
      };
      portfolioReturn.status = evaluatePortfolio(portfolioReturn);
      return portfolioReturn;
    },

    setPortfolioItems: async (req) => {
      const portfolio = await portfolioRepository.init(req);
      const items = await portfolioRepository.getItemsInPortfolio(portfolio.id);
      const categories = await categorizeItems(items);

      const portfolioReturn: Portfolio.Res.Root = {
        ...portfolio,
        categories,
        status: "PENDING",
      };
      portfolioReturn.status = evaluatePortfolio(portfolioReturn);
      return portfolioReturn;
    },

    getAvailableCategories: async (req) => {
      const availableCategories =
        await portfolioRepository.getAvailableCategories(req);

      return availableCategories.map(Category.Map.toRoot);
    },

    getAvailableItems: async (req) => {
      const availableItems = await portfolioRepository.getAvailableItems(req);

      return availableItems.map(Item.Map.toRoot);
    },
  };
};
