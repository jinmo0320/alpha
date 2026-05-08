import {
  CreatePlanReqDto,
  GetPlanReqDto,
  Plan,
  UpdatePlanReqDto,
} from "src/application/model/plan.model";

export type PlanService = {
  getPlan: (req: GetPlanReqDto) => Promise<Plan.Root | null>;
  createPlan: (req: CreatePlanReqDto) => Promise<void>;
  updatePlan: (req: UpdatePlanReqDto) => Promise<void>;
  clearPlan: (projectId: number) => Promise<void>;
};
