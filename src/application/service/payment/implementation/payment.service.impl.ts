import { PaymentDeps } from "../interface/payment.deps";
import { PaymentService } from "../interface/payment.service";

export const createPaymentService = ({
  paymentRepository,
}: PaymentDeps): PaymentService => ({
  getPayments: async (userId) => paymentRepository.getAllPaidSchedules(userId),

  recordPayment: async ({ scheduleId, amount, paidAt }) => {
    await paymentRepository.updateSchedulePaid(
      scheduleId,
      amount,
      paidAt ? new Date(paidAt) : new Date(),
    );
  },
});
