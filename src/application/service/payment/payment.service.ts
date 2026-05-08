import { UUID } from "crypto";
import {
  PaymentSchedule,
  RecordPaymentReqDto,
} from "src/application/model/payment.model";

export type PaymentService = {
  getPayments: (userId: UUID) => Promise<PaymentSchedule[]>;
  recordPayment: (req: RecordPaymentReqDto) => Promise<void>;
};
