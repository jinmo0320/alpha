import { UUID } from "crypto";
import { PaymentSchedule } from "../../../repository/payment/payment.entity";
import { RecordPaymentReqDto } from "../dto/payment.dto";

export type PaymentService = {
  getPayments: (userId: UUID) => Promise<PaymentSchedule[]>;
  recordPayment: (req: RecordPaymentReqDto) => Promise<void>;
};
