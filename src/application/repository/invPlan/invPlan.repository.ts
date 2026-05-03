import { InvestmentPlan } from "src/application/repository/invPlan/invPlan.entity";

export type InvPlanRepository = {
  /**
   * 포트폴리오의 현재 활성화된 투자 계획 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 활성화된 투자 계획 또는 null (없을 경우)
   */
  getActivePlan: (portfolioId: number) => Promise<InvestmentPlan.Root | null>;

  /**
   * 포트폴리오의 모든 투자 계획 조회 (이전 버전 포함)
   * @param portfolioId 포트폴리오 ID
   * @returns 투자 계획 목록
   */
  getAllPlans: (portfolioId: number) => Promise<InvestmentPlan.Root[]>;

  /**
   * 새로운 투자 계획 생성
   * @param portfolioId 포트폴리오 ID
   * @param data 투자 계획 정보
   * @returns 생성된 투자 계획 ID
   */
  createPlan: (
    portfolioId: number,
    data: InvestmentPlan.CreateInput,
  ) => Promise<number>;

  /**
   * 기존 투자 계획 업데이트
   * @param planId 투자 계획 ID
   * @param data 업데이트할 데이터
   */
  updatePlan: (
    planId: number,
    data: InvestmentPlan.UpdateInput,
  ) => Promise<void>;

  /**
   * 포트폴리오의 모든 투자 계획 비활성화
   * @param portfolioId 포트폴리오 ID
   */
  deactivatePlans: (portfolioId: number) => Promise<void>;
};
