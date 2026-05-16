import { Plan } from "src/application/model/plan.model";

export type PlanRepository = {
  /**
   * 계획을 생성
   * @param req 프로젝트 ID와 계획 정보
   * @returns 생성된 계획 정보
   */
  create: (req: Plan.Req.Create) => Promise<Plan.Entity>;

  /**
   * 프로젝트의 계획을 조회
   * @param projectId 프로젝트 ID
   * @returns 계획 정보 또는 null
   */
  get: (projectId: number) => Promise<Plan.Entity | null>;

  /**
   * 프로젝트의 모든 계획을 조회
   * @param projectId 프로젝트 ID
   * @returns 계획 목록
   */
  getAll: (projectId: number) => Promise<Plan.Entity[]>;

  /**
   * 프로젝트의 현재 계획 날짜 정보를 설정
   * @param req 프로젝트 ID와 날짜 정보
   * @returns 수정된 계획 정보 또는 null
   */
  setDate: (req: Plan.Req.Day) => Promise<void>;
};
