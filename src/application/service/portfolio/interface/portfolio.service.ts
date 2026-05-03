import { UUID } from "crypto";
import { Portfolio } from "src/application/repository/portfolio/entity/portfolio.entity";
import {
  AddCategoryReqDto,
  AddItemReqDto,
  CreateFromPresetReqDto,
  DeleteCategoryReqDto,
  DeleteItemReqDto,
  PatchCategoryReqDto,
  UpdateCategoryPortionsReqDto,
  UpdateItemAbsolutePortionsReqDto,
  UpdateItemInfoReqDto,
  UpdateItemRelativePortionsReqDto,
} from "src/application/service/portfolio/dto/portfolio.dto";

export type PortfolioService = {
  getPortfolio: (userId: UUID) => Promise<Portfolio.Root | null>;
  getRecommendations: (userId: UUID) => Promise<Portfolio.Preset[]>;
  createFromPreset: (req: CreateFromPresetReqDto) => Promise<void>;
  getCategories: (portfolioId: number) => Promise<Portfolio.Category[]>;
  updateCategoryPortions: (
    req: UpdateCategoryPortionsReqDto,
  ) => Promise<void>;
  addCategory: (req: AddCategoryReqDto) => Promise<void>;
  deleteCategory: (req: DeleteCategoryReqDto) => Promise<void>;
  updateCategoryInfo: (req: PatchCategoryReqDto) => Promise<void>;
  getAvailableCategories: (
    portfolioId: number,
  ) => Promise<Portfolio.AvailableCategory[]>;
  getItemsAbsolute: (portfolioId: number) => Promise<Portfolio.Item[]>;
  getItemsRelative: (categoryId: number) => Promise<Portfolio.Item[]>;
  updateItemAbsolutePortions: (
    req: UpdateItemAbsolutePortionsReqDto,
  ) => Promise<void>;
  updateItemRelativePortions: (
    req: UpdateItemRelativePortionsReqDto,
  ) => Promise<void>;
  addItem: (req: AddItemReqDto) => Promise<void>;
  deleteItem: (req: DeleteItemReqDto) => Promise<void>;
  updateItemInfo: (req: UpdateItemInfoReqDto) => Promise<void>;
  getAvailableItems: (
    categoryId: number,
  ) => Promise<Portfolio.AvailableItem[]>;
};
