import { PaymentRepository } from "../../../repository/payment/payment.repository";

export type PaymentDeps = {
  paymentRepository: PaymentRepository;
};
