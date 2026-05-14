import { UUID } from "crypto";
import { RowDataPacket } from "mysql2";

export namespace Category {
  // DB Entity
  export type Entity = {
    id: number;
    code: string;
    name: string;
    description: string | null;
  };

  // DTO Response and Request
  export namespace Res {
    export type Root = Entity;
  }

  export namespace Req {
    export type Available = {
      userId: UUID;
      portfolioId: number;
    };

    export type Create = {
      userId: string;
      name: string;
      description?: string;
    };

    export type Update = {
      categoryId: number;
      name?: string;
      description?: string;
    };
  }

  // Mapping Functions
  export namespace Map {
    export const toEntity = (row: RowDataPacket): Entity => ({
      id: Number(row.id),
      code: row.code,
      name: row.name,
      description: row.description ?? null,
    });

    export const toRoot = (entity: Entity): Res.Root => ({
      ...entity,
    });
  }
}
