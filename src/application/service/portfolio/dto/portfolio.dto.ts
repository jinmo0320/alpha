import { UUID } from "crypto";

export type CreateFromPresetReqDto = {
  userId: UUID;
  presetCode: string;
};

export type UpdateCategoryPortionsReqDto = {
  portfolioId: number;
  portions: { id: number; portion: number }[];
};

export type DeleteCategoryReqDto = {
  portfolioId: number;
  categoryId: number;
};

export type GetItemsRelativeReqDto = {
  portfolioId: number;
  categoryId: number;
};

export type UpdateItemRelativePortionsReqDto = {
  portfolioId: number;
  categoryId: number;
  portions: { id: number; portion: number }[];
};

export type UpdateItemAbsolutePortionsReqDto = {
  portfolioId: number;
  portions: { id: number; portion: number }[];
};

export type DeleteItemReqDto = {
  portfolioId: number;
  itemId: number;
};

export type GetAvailableItemsReqDto = {
  categoryId: number;
};
