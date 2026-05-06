import { Plan } from "./plan.entity";

export type PlanRepository = {
  getActivePlan: (projectId: number) => Promise<Plan.Root | null>;
  getAllPlans: (projectId: number) => Promise<Plan.Root[]>;
  createPlan: (projectId: number, data: Plan.CreateInput) => Promise<number>;
  updatePlan: (planId: number, data: Plan.UpdateInput) => Promise<void>;
  deactivatePlans: (projectId: number) => Promise<void>;
};
