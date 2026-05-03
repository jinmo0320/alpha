import { UUID } from "crypto";
import {
  InvestmentProgress,
  PaymentSchedule,
} from "src/application/repository/payment/payment.entity";
import { PlanForSchedule } from "src/implementation/service/payment/logic/payment.logic";
import { RecordPaymentReqDto } from "src/application/service/payment/dto/payment.dto";

export type PaymentService = {
  getInvestmentProgress: (userId: UUID) => Promise<InvestmentProgress | null>;
  getInvestmentPayments: (userId: UUID) => Promise<PaymentSchedule[]>;
  recordPayment: (req: RecordPaymentReqDto) => Promise<void>;
  generateSchedulesForPlan: (
    planId: number,
    plan: PlanForSchedule,
  ) => Promise<void>;
};
