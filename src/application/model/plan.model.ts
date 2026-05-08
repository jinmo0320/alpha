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

export type PlanReqDto = {
  initialAmount: number;
  monthlyAmount: number;
  startDate: string;
  paymentDay: number;
  period: number;
  expectedReturn: number;
  targetAmount: number;
};

export type GetPlanReqDto = {
  projectId: number;
};

export type CreatePlanReqDto = {
  projectId: number;
  plan: PlanReqDto;
};

export type UpdatePlanReqDto = CreatePlanReqDto;

export const isValidPlanReqDto = (req: any): req is PlanReqDto => {
  const required = [
    "initialAmount",
    "monthlyAmount",
    "startDate",
    "paymentDay",
    "period",
    "expectedReturn",
    "targetAmount",
  ];
  return required.every((field) => req[field] !== undefined);
};
