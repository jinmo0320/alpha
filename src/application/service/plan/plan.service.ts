import { Plan } from "src/application/model/plan.model";

export type PlanService = {
  /**
   * creates a new plan
   * @param mtrf MTrF simulation request
   */
<<<<<<< HEAD
  createPlan: (mtrf: Plan.Req.Create) => Promise<Plan.Res.Root>;
=======
  createPlan: (mtrf: Plan.Req.Simulation) => Promise<void>;
>>>>>>> parent of 129b1f1 (add getItemsInPortfolio)

  /**
   * gets a plan by project id
   * @param projectId project id
   * @returns plan or null if not found
   */
  getPlan: (projectId: number) => Promise<Plan.Res.Root | null>;
};
