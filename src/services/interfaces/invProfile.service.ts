import { UUID } from "crypto";
import { InvestmentPlan } from "src/domain/investmentProfile/invPlan.entity";
import { User } from "src/domain/user/user.entity";
import {
  AssessRiskTypeReqDto,
  CreatePlanReqDto,
  UpdatePlanReqDto,
} from "src/services/dtos/invProfile.dto";

export type InvProfileService = {
  getRiskType: (userId: UUID) => Promise<User.RiskType | null>;
  assessRiskType: (req: AssessRiskTypeReqDto) => Promise<User.RiskType>;
  clearRiskType: (userId: UUID) => Promise<void>;
  getPlan: (userId: UUID) => Promise<InvestmentPlan.Root | null>;
  createPlan: (req: CreatePlanReqDto) => Promise<void>;
  updatePlan: (req: UpdatePlanReqDto) => Promise<void>;
  clearPlan: (userId: UUID) => Promise<void>;
};
