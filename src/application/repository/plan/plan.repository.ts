import { Plan } from "src/application/model/plan.model";

export type PlanRepository = {
  /**
   * create a new plan with MTrF data and version update
   * @param req project id and MTrF data
   */
  create: (req: Plan.Req.Create) => Promise<Plan.Entity>;
  /**
   * get the plan of a project
   * @param projectId project id
   * @returns the plan if found, otherwise null
   */
  get: (projectId: number) => Promise<Plan.Entity | null>;
};
