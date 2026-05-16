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
        ErrorCodes.PLAN.INVALID_INVESTMENT_PLAN,
        "The provided plan parameters are invalid.",
      );
    }
    const plan = await planRepository.create(mtrf);
    return Plan.Map.toRoot(plan);
  },

  updatePlan: async (mtrf) => {
    const currentPlan = await planRepository.get(mtrf.projectId);
    if (!currentPlan) {
      throw new DomainError(ErrorCodes.PLAN.NOT_FOUND, "Plan not found");
    }

    if (!isValidPlan(mtrf)) {
      throw new DomainError(
        ErrorCodes.PLAN.INVALID_INVESTMENT_PLAN,
        "The provided plan parameters are invalid.",
      );
    }

    const plan = await planRepository.create(mtrf);
    if (currentPlan.paymentDay === null) {
      return Plan.Map.toRoot(plan);
    }

    await planRepository.setDate({
      projectId: mtrf.projectId,
      paymentDay: currentPlan.paymentDay,
    });

    const updatedPlan = await planRepository.get(mtrf.projectId);
    if (!updatedPlan) {
      throw new DomainError(ErrorCodes.PLAN.NOT_FOUND, "Plan not found");
    }

    return Plan.Map.toRoot(updatedPlan);
  },

  getPlan: async (projectId) => {
    const plan = await planRepository.get(projectId);
    return plan ? Plan.Map.toRoot(plan) : null;
  },

  getAllPlans: async (projectId) => {
    const plans = await planRepository.getAll(projectId);
    return plans.map(Plan.Map.toRoot);
  },

  setDate: async (req) => {
    const plan = await planRepository.setDate(req);
  },
});
