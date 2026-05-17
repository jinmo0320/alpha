import { UUID } from "crypto";
import { RowDataPacket } from "mysql2";

export namespace Item {
  // DB Entity
  export type Entity = {
    id: number;
    categoryId: number;
    name: string;
    description: string | null;
    minReturn: number;
    maxReturn: number;
  };

  // DTO Response and Request
  export namespace Res {
    export type Root = Entity;
  }

  export namespace Req {
    export type Available = {
      userId: UUID;
      portfolioId: number;
      categoryId: number;
    };

    export type Create = {
      userId: string;
      categoryId: number;
      name: string;
      description?: string;
      minReturn: number;
      maxReturn: number;
    };

    export type Update = {
      itemId: number;
      categoryId?: number;
      name?: string;
      description?: string;
      minReturn?: number;
      maxReturn?: number;
    };
  }

  // Mapping Functions
  export namespace Map {
    export const toEntity = (row: RowDataPacket): Entity => ({
      id: Number(row.id),
      categoryId: Number(row.categoryId),
      name: row.name,
      description: row.description ?? null,
      minReturn: Number(row.minReturn),
      maxReturn: Number(row.maxReturn),
    });

    export const toRoot = (entity: Entity): Res.Root => ({
      ...entity,
    });
  }
}
