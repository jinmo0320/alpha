/**
 * PaymentSchedule: Represents a planned or completed payment.
 */
export type PaymentSchedule = {
  id: number;
  projectId: number;
  sequence: number; // 전체 기간 중 몇 회차인가
  expectedDate: string; // 납입 예정일
  amount: number; // 예정 금액

  // 상태 및 실적
  status: "PENDING" | "PAID" | "MISSED" | "SKIPPED";
  actualPaidAmount?: number; // 실제로 넣은 금액 (부분납 대응)
  actualPaidDate?: string; // 실제 납입 날짜
};
