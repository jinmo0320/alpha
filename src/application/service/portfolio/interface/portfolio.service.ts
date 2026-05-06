import { UUID } from "crypto";
import { Portfolio } from "../../../repository/portfolio/entity/portfolio.entity";
import {
  CreateFromPresetReqDto,
  DeleteCategoryReqDto,
  DeleteItemReqDto,
  GetAvailableItemsReqDto,
  GetItemsRelativeReqDto,
  UpdateCategoryPortionsReqDto,
  UpdateItemAbsolutePortionsReqDto,
  UpdateItemRelativePortionsReqDto,
} from "../dto/portfolio.dto";

export type PortfolioService = {
  getPortfolio: (userId: UUID) => Promise<Portfolio.Root | null>;
  getRecommendations: (userId: UUID) => Promise<Portfolio.Preset[]>;
  createFromPreset: (req: CreateFromPresetReqDto) => Promise<void>;
  getCategories: (portfolioId: number) => Promise<Portfolio.Category[]>;
  updateCategoryPortions: (
    req: UpdateCategoryPortionsReqDto,
  ) => Promise<void>;
  deleteCategory: (req: DeleteCategoryReqDto) => Promise<void>;
  getAvailableCategories: (
    portfolioId: number,
  ) => Promise<Portfolio.AvailableCategory[]>;
  getItemsAbsolute: (portfolioId: number) => Promise<Portfolio.Item[]>;
  getItemsRelative: (req: GetItemsRelativeReqDto) => Promise<Portfolio.Item[]>;
  updateItemAbsolutePortions: (
    req: UpdateItemAbsolutePortionsReqDto,
  ) => Promise<void>;
  updateItemRelativePortions: (
    req: UpdateItemRelativePortionsReqDto,
  ) => Promise<void>;
  deleteItem: (req: DeleteItemReqDto) => Promise<void>;
  getAvailableItems: (req: GetAvailableItemsReqDto) => Promise<
    Portfolio.AvailableItem[]
  >;
};
