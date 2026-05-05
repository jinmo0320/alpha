import { PlanDeps } from "../interface/plan.deps";
import { PlanService } from "../interface/plan.service";

export const createPlanService = ({
  planRepository,
}: PlanDeps): PlanService => ({
  getPlan: async ({ projectId }) => planRepository.getActivePlan(projectId),

  createPlan: async ({ projectId, plan }) => {
    await planRepository.deactivatePlans(projectId);
    await planRepository.createPlan(projectId, plan);
  },

  updatePlan: async ({ projectId, plan }) => {
    await planRepository.deactivatePlans(projectId);
    await planRepository.createPlan(projectId, plan);
  },

  clearPlan: async (projectId) => planRepository.deactivatePlans(projectId),
});
