import { UUID } from "crypto";

export namespace User {
  // DB Entity
  export type Entity = {
    id: UUID;
    email: string;
    name: string;
    tag: string;
    hashedPassword: string;
    riskType: Entity.RiskType | null;
    createdAt: Date;
    updatedAt: Date;
  };

  export namespace Entity {
    export type RiskType =
      | "STABLE"
      | "STABLE_SEEK"
      | "NEUTRAL"
      | "ACTIVE"
      | "AGGRESSIVE";
  }

  // DTO Response and Requset
  export namespace Res {
    export type Root = {
      id: UUID;
      email: string;
      name: string;
      tag: string;
      riskType: Entity.RiskType | null;
      createdAt: Date;
      updatedAt: Date;
    };

    export type Password = {
      id: UUID;
      email: string;
      hashedPassword: string;
    };
  }

  export namespace Req {
    export type Create = {
      email: string;
      name: string;
      tag: string;
      password: string;
    };

    export type ChangePassword = {
      userId: UUID;
      oldPassword: string;
      newPassword: string;
    };

    export type ChangeName = {
      userId: UUID;
      name: string;
      tag: string;
    };

    export type SetRiskType = {
      userId: UUID;
      score: number | null;
    };
  }
}
