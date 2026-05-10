import { Plan } from "src/application/model/plan.model";
import { PlanDeps } from "./plan.deps";
import { PlanService } from "./plan.service";
import { isValidPlan } from "./plan.logic";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";

export const createPlanService = ({
  planRepository,
}: PlanDeps): PlanService => ({
  createPlan: async (mtrf) => {
    if (!isValidPlan(mtrf)) {
      throw new DomainError(
        ErrorCodes.INV_PROFILE.INVALID_INVESTMENT_PLAN,
        "The provided plan parameters are invalid.",
      );
    }
    const plan = await planRepository.createPlan(mtrf);
    return Plan.Map.toRoot(plan);
  },

  getPlan: async (projectId) => {
    const plan = await planRepository.getPlan(projectId);
    return plan ? Plan.Map.toRoot(plan) : null;
  },
});
