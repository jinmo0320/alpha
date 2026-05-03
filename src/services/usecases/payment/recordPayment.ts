import { PaymentDeps } from "src/services/implementations/payment.service.impl";
import { RecordPaymentReqDto } from "src/services/dtos/payment.dto";

type RecordPayment = (req: RecordPaymentReqDto) => Promise<void>;

export const recordPayment =
  ({ paymentRepository }: PaymentDeps): RecordPayment =>
  async ({ scheduleId, amount, paidAt }) => {
    await paymentRepository.updateSchedulePaid(
      scheduleId,
      amount,
      new Date(paidAt),
    );
  };
