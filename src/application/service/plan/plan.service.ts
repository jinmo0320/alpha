import { promises } from "dns";
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
   * 프로젝트의 계획을 수정
   * @param mtrf 계획 수정 정보
   * @errors INVALID_INVESTMENT_PLAN, PLAN_NOT_FOUND
   * @returns 수정된 계획 정보
   */
  updatePlan: (mtrf: Plan.Req.Create) => Promise<Plan.Res.Root>;

  /**
   * 프로젝트의 현재 계획을 조회
   * @param projectId 프로젝트 ID
   * @returns 계획 정보 또는 null
   */
  getPlan: (projectId: number) => Promise<Plan.Res.Root | null>;

  /**
   * 프로젝트의 모든 계획을 조회
   * @param projectId 프로젝트 ID
   * @returns 계획 목록
   */
  getAllPlans: (projectId: number) => Promise<Plan.Res.Root[]>;

  /**
   * 프로젝트의 현재 계획 날짜 정보를 설정
   * @param req 프로젝트 ID와 날짜 정보
   * @returns 수정된 계획 정보
   */
  setDate: (req: Plan.Req.Day) => Promise<void>;
};
