import { Plan } from "src/application/model/plan.model";

export type PlanService = {
  /**
   * 계획을 생성
   * @param mtrf 계획 생성 정보
   * @errors INVALID_INVESTMENT_PLAN
   * @returns 생성된 계획 정보
   */
  createPlan: (mtrf: Plan.Req.Create) => Promise<Plan.Res.Root>;

  /**
   * 프로젝트의 계획을 조회
   * @param projectId 프로젝트 ID
   * @returns 계획 정보 또는 null
   */
  getPlan: (projectId: number) => Promise<Plan.Res.Root | null>;
};
