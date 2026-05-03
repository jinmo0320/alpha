import { UUID } from "crypto";
import { InvestmentPlan } from "src/application/repository/invPlan/invPlan.entity";
import { User } from "src/application/repository/user/entity/user.entity";
import {
  AssessRiskTypeReqDto,
  CreatePlanReqDto,
  UpdatePlanReqDto,
} from "src/application/service/investmentProfile/dto/invProfile.dto";

export type InvProfileService = {
  getRiskType: (userId: UUID) => Promise<User.RiskType | null>;
  assessRiskType: (req: AssessRiskTypeReqDto) => Promise<User.RiskType>;
  clearRiskType: (userId: UUID) => Promise<void>;
  getPlan: (userId: UUID) => Promise<InvestmentPlan.Root | null>;
  createPlan: (req: CreatePlanReqDto) => Promise<void>;
  updatePlan: (req: UpdatePlanReqDto) => Promise<void>;
  clearPlan: (userId: UUID) => Promise<void>;
};
