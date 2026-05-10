import { RowDataPacket } from "mysql2";

export namespace Plan {
  // DB Entity
  export type Entity = {
    version: number;

    initialAmount: number;
    monthlyAmount: number;
    period: number;
    expectedReturn: number;
    targetAmount: number;

    startDate: Date | null;
    paymentDay: number | null;

    createdAt: Date;
    updatedAt: Date;

    isActive: boolean;
  };

  // DTO Response and Request
  export namespace Res {
    export type Root = Entity;
  }

  export namespace Req {
    export type Create = {
      projectId: number;
      initialAmount: number;
      monthlyAmount: number;
      period: number;
      expectedReturn: number;
      targetAmount: number;
    };

    export type Date = {
      startDate: Date;
      paymentDay: number;
    };
  }

  // Mapping Functions
  export namespace Map {
    export const toEntity = (row: RowDataPacket): Entity => ({
      version: Number(row.version),
      initialAmount: Number(row.initialAmount),
      monthlyAmount: Number(row.monthlyAmount),
      period: Number(row.period),
      expectedReturn: Number(row.expectedReturn),
      targetAmount: Number(row.targetAmount),
      startDate: row.startDate === null ? null : new Date(row.startDate),
      paymentDay: row.paymentDay === null ? null : Number(row.paymentDay),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
      isActive: Boolean(row.isActive),
    });

    export const toRoot = (entity: Entity): Res.Root => ({
      ...entity,
    });
  }
}
