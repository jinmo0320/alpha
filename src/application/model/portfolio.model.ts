import { Category } from "./category.model";
import { Item } from "./item.model";
import { RowDataPacket } from "mysql2";

export namespace Portfolio {
  // DB Entity
  export type Entity = {
    id: number;
    name: string;
    minReturn: number;
    maxReturn: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export namespace Entity {
    export type Preset = {
      code: string;
      name: string;
      description: string | null;
      targetReturnPercent: number;
      minReturn: number;
      maxReturn: number;
    };

    export type Item = Item.Entity & {
      portion: number;
      alias?: string | null;
      aliasDescription?: string | null;
    };
  }

  // DTO Response and Request
  export namespace Res {
    export type Root = Entity & {
      categories: (Category.Entity & {
        portion: number;
        minReturn: number;
        maxReturn: number;
        items: Entity.Item[];
      })[];
      status: Status;
    };

    export type Preset = Entity.Preset & {
      categories: (Category.Entity & {
        portion: number;
        minReturn: number;
        maxReturn: number;
        items: Entity.Item[];
      })[];
    };

    export enum Status {
      PENDING = "PENDING", // 미완성
      STABLE = "STABLE", // 완성
      OVER_ALLOCATED = "OVER_ALLOCATED", // 오류
    }
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

  // Mapping Functions
  export namespace Map {
    export const toEntity = (row: RowDataPacket): Entity => ({
      id: Number(row.id),
      name: row.name,
      minReturn: Number(row.minReturn),
      maxReturn: Number(row.maxReturn),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    });

    export const toPresetEntity = (row: RowDataPacket): Entity.Preset => ({
      code: row.code,
      name: row.name,
      description: row.description ?? null,
      targetReturnPercent: Number(row.targetReturnPercent),
      minReturn: Number(row.minReturn),
      maxReturn: Number(row.maxReturn),
    });

    export const toItemEntity = (row: RowDataPacket): Entity.Item =>
      row.alias
        ? {
            id: Number(row.id),
            categoryId: Number(row.categoryId),
            name: row.name,
            description: row.description ?? null,
            minReturn: Number(row.minReturn),
            maxReturn: Number(row.maxReturn),
            portion: Number(row.portion),
            alias: row.alias ?? null,
            aliasDescription: row.aliasDescription ?? null,
          }
        : {
            id: Number(row.id),
            categoryId: Number(row.categoryId),
            name: row.name,
            description: row.description ?? null,
            minReturn: Number(row.minReturn),
            maxReturn: Number(row.maxReturn),
            portion: Number(row.portion),
          };
  }
}
