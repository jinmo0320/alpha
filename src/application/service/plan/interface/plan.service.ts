import { Plan } from "../../../repository/plan/plan.entity";
import {
  CreatePlanReqDto,
  GetPlanReqDto,
  UpdatePlanReqDto,
} from "../dto/plan.dto";

export type PlanService = {
  getPlan: (req: GetPlanReqDto) => Promise<Plan.Root | null>;
  createPlan: (req: CreatePlanReqDto) => Promise<void>;
  updatePlan: (req: UpdatePlanReqDto) => Promise<void>;
  clearPlan: (projectId: number) => Promise<void>;
};
