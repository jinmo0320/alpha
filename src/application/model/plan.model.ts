export namespace Plan {
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
}
