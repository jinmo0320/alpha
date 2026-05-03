import { PaymentDeps } from "src/implementation/service/payment/deps";
import { RecordPaymentReqDto } from "src/application/service/payment/dto/payment.dto";

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
