import { UUID } from "crypto";
import { Portfolio } from "./portfolio.model";
import { Plan } from "./plan.model";

export namespace Project {
  export type Entity = {
    id: number;
    name: string;
    status: "PENDING" | "STABLE" | "DISABLED";
    createdAt: Date;
    updatedAt: Date;
  };

  export namespace Res {
    export type Abstract = Entity;
    export type Detail = Entity & {
      portfolio: Portfolio.Res.Root;
      plan: Plan.Res.Root;
    };
  }

  export namespace Req {
    export type Create = {
      userId: UUID;
      name: string;
    };
  }
}
