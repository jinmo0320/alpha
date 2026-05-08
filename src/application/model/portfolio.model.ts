import { UUID } from "crypto";

export type ExpectedReturn = {
  min: number;
  max: number;
};

export namespace Portfolio {
  export type Root = {
    id: number;
    name: string;
    description: string;
    status: "PENDING" | "STABLE" | "DISABLED";
    categories: Category[];
    items: Item[];
    expectedReturn: ExpectedReturn;
    createdAt: string;
    updatedAt: string;
  };

  export type Category = {
    id: number;
    code: string;
    name: string;
    description: string;
    portion: number;
    expectedReturn: ExpectedReturn;
  };

  export type Item = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    portion: number; // 자산의 절대 비중
    expectedReturn: ExpectedReturn;
  };

  export type Preset = {
    code: string;
    name: string;
    description: string;
    categories: Pick<Category, "name" | "portion">[];
    items: Pick<Item, "id" | "portion">[];
    targetReturnPercent: number;
    expectedReturn: ExpectedReturn;
  };

  export type AvailableCategory = Pick<Category, "id" | "name" | "description">;

  export type AvailableItem = Pick<
    Item,
    "id" | "categoryId" | "name" | "description" | "expectedReturn"
  >;
}

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
