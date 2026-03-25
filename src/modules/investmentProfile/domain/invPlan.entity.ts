/**
 * InvestmentPlan: 특정 시점의 투자 가이드라인 (Snapshot)
 * 금액이나 기간이 변경될 때마다 새로운 ID와 Version을 가진 Plan을 생성
 */

export namespace InvestmentPlan {
  export type Root = {
    id: number;
    version: number;

    // 설정 정보
    initialAmount: number; // 해당 플랜 시작 시점의 기준 자산
    monthlyAmount: number; // 월 납입금

    startDate: string; // 이 버전의 플랜이 적용되는 시작일
    paymentDay: number; // 매월 납입일 (1~31)
    period: number; // 남은 투자 기간 (개월)

    expectedReturn: number; // 연간 기대 수익률 (0.06 등)
    targetAmount: number; // 최종 목표 금액

    // 관리용
    createdAt: string;
    isActive: boolean; // 현재 이 플랜이 기준인지 여부
  };

  export type CreateInput = {
    initialAmount: number;
    monthlyAmount: number;
    period: number;
    expectedReturn: number;
    targetAmount: number;
  };

  export type UpdateInput = Partial<Root>;
}
