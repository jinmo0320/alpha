export namespace Plan {
  export type Root = {
    id: number;
    version: number;
    initialAmount: number;
    monthlyAmount: number;
    startDate: string;
    paymentDay: number;
    period: number;
    expectedReturn: number;
    targetAmount: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };

  export type CreateInput = {
    initialAmount: number;
    monthlyAmount: number;
    startDate: string;
    paymentDay: number;
    period: number;
    expectedReturn: number;
    targetAmount: number;
  };

  export type UpdateInput = Partial<CreateInput> & {
    isActive?: boolean;
  };
}
