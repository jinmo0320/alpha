import { UUID } from "crypto";
import { PaymentRepository } from "src/repositories/interfaces/payment.repository";

type GetInvestmentPaymentsDeps = {
  paymentRepository: PaymentRepository;
};

export const getInvestmentPayments =
  ({ paymentRepository }: GetInvestmentPaymentsDeps) =>
  async (userId: UUID) => {
    return await paymentRepository.getAllPaidSchedules(userId);
  };
