import { Plan } from "src/application/model/plan.model";

export type PlanService = {
  /**
   * creates a new plan
   * @param mtrf MTrF simulation request
   * @errors INVALID_INVESTMENT_PLAN
   * @returns created plan
   */
  createPlan: (mtrf: Plan.Req.Create) => Promise<Plan.Res.Root>;

  /**
   * gets a plan by project id
   * @param projectId project id
   * @returns plan or null if not found
   */
  getPlan: (projectId: number) => Promise<Plan.Res.Root | null>;
};
