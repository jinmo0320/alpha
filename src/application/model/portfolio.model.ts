import { Category } from "./category.model";
import { Item } from "./item.model";

export namespace Portfolio {
  export type Entity = {
    id: number;
    name: string;
    status: "PENDING" | "STABLE" | "DISABLED";
    minReturn: number;
    maxReturn: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export namespace Res {
    export type Root = Entity & {
      categories: (Category.Entity & {
        portion: number;
        minReturn: number;
        maxReturn: number;
<<<<<<< HEAD
        items: Entity.Item[];
      })[];
=======
        items: Item.Entity & {
          portion: number;
          alias: string;
          aliasDescription: string;
        };
      };
>>>>>>> parent of 129b1f1 (add getItemsInPortfolio)
      isActive: boolean;
    };
  }

  export namespace Req {
    export type Create = {
      projectId: number;
      presetCode: string;
    };

    export type Set = {
      portfolioId: number;
      items: {
        itemId: number;
        portion: number;
        alias?: string;
        aliasDescription?: string;
      }[];
    };
  }
}

export namespace Preset {
  export type Entity = {
    code: string;
    name: string;
    description: string;
    targetReturnPercent: number;
    minReturn: number;
    maxReturn: number;
  };

  export namespace Res {
    export type Root = Entity & {
      categories: (Category.Entity & {
        portion: number;
        minReturn: number;
        maxReturn: number;
        items: (Item.Entity & {
          portion: number;
        })[];
      })[];
    };
  }
}
