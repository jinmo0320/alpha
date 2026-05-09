import { Plan } from "src/application/model/plan.model";

export type PlanService = {
  /**
   * creates a new plan
   * @param mtrf MTrF simulation request
   */
  createPlan: (mtrf: Plan.Req.Create) => Promise<void>;

  /**
   * gets a plan by project id
   * @param projectId project id
   * @returns plan or null if not found
   */
  getPlan: (projectId: number) => Promise<Plan.Res.Root | null>;
};
