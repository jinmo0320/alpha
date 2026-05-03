import { UUID } from "crypto";
import {
  InvestmentProgress,
  PaymentSchedule,
} from "src/domain/payment/payment.entity";
import { PlanForSchedule } from "src/domain/payment/payment.logic";
import { RecordPaymentReqDto } from "src/services/dtos/payment.dto";

export type PaymentService = {
  getInvestmentProgress: (
    userId: UUID,
  ) => Promise<InvestmentProgress | null>;
  getInvestmentPayments: (userId: UUID) => Promise<PaymentSchedule[]>;
  recordPayment: (req: RecordPaymentReqDto) => Promise<void>;
  generateSchedulesForPlan: (
    planId: number,
    plan: PlanForSchedule,
  ) => Promise<void>;
};
