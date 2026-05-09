import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";

export type PortfolioService = {
  /**
   * gets activated portfolio of project
   * @param projectId project id
   * @returns full portfolio spec of the project, or null if not found
   */
  getPortfolio: (projectId: number) => Promise<Portfolio.Res.Root | null>;

  /**
   * gets recommended portfolios preset for a user
   * @param projectId project id
   * @returns array of recommended portfolios
   */
  recommendPresets: (projectId: number) => Promise<Portfolio.Res.Preset[]>;

  /**
   * creates a portfolio for the user based on the preset code
   * @param req project id and preset code
   * @returns full portfolio spec
   */
  createFromPreset: (req: Portfolio.Req.Create) => Promise<Portfolio.Res.Root>;

  /**
   * sets portfolio items with portion
   * @param req portfolio id and items with portion
   * @return full portfolio spec
   */
  setPortfolio: (req: Portfolio.Req.Set) => Promise<Portfolio.Res.Root>;

  /**
   * gets available categories for the portfolio
   * @param portfolioId portfolio id
   * @returns available categories
   */
  getAvailableCategories: (portfolioId: number) => Promise<Category.Res.Root[]>;

  /**
   * gets available items for the category in the portfolio
   * @param req portfolio id and category id
   * @returns available items
   */
  getAvailableItems: (req: Item.Req.Available) => Promise<Item.Res.Root[]>;
};
