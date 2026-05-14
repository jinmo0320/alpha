import { UUID } from "crypto";
import { Portfolio } from "./portfolio.model";
import { Plan } from "./plan.model";
import { RowDataPacket } from "mysql2";

export namespace Project {
  // DB Entity
  export type Entity = {
    id: number;
    name: string;
    status: "PENDING" | "STABLE" | "WARNING" | "DISABLED";
    createdAt: Date;
    updatedAt: Date;
  };

  // DTO Response and Request
  export namespace Res {
    export type Abstract = Entity;

    export type Detail = Entity & {
      portfolio: Portfolio.Res.Root | null;
      plan: Plan.Res.Root | null;
      warningCode: WarningCode;
    };

    export type WarningCode = 
      | "EMPTY_PLAN"
      | "EMPTY_PORTFOLIO"
      | "INVALID_PORTFOLIO"
      | "TYPE_PLAN_MISMATCH"
      | "PLAN_PORTFOLIO_MISMATCH"
    }
  }

  export namespace Req {
    export type Create = {
      userId: UUID;
      name: string;
    };
  }

  // Mapping Functions
  export namespace Map {
    export const toEntity = (row: RowDataPacket): Project.Entity => ({
      id: Number(row.id),
      name: row.name,
      status: row.status,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    });

    export const toAbstract = (
      entity: Project.Entity,
    ): Project.Res.Abstract => ({
      ...entity,
    });
  }
}
