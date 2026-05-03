import { InvPlanRepository } from "src/application/repository/investmentProfile/interface/invPlan.repository";
import { UserRepository } from "src/application/repository/user/interface/user.repository";
import { PaymentService } from "src/application/service/payment/interface/payment.service";

export type InvProfileDeps = {
  invPlanRepository: InvPlanRepository;
  userRepository: UserRepository;
  paymentService: PaymentService;
};
