import { UUID } from "crypto";

export namespace ProjectDto {
  export namespace Response {
    export type Abstract = {
      id: number;
      name: string;
      status: "STABLE" | "PENDING" | "DISABLED";
      createdAt: Date;
      updatedAt: Date;
    };

    export type Detail = Abstract & {};
  }

  export namespace Request {
    export type Create = {
      userId: UUID;
      name: string;
    };
  }
}
