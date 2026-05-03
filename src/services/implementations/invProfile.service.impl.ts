import { InvPlanRepository } from "src/repositories/interfaces/invPlan.repository";
import { UserRepository } from "src/repositories/interfaces/user.repository";
import { PaymentService } from "src/services/interfaces/payment.service";
import { InvProfileService } from "src/services/interfaces/invProfile.service";

import * as Usecases from "../usecases/investmentProfile";

export type InvProfileDeps = {
  invPlanRepository: InvPlanRepository;
  userRepository: UserRepository;
  paymentService: PaymentService;
};

export const createInvProfileService = (deps: InvProfileDeps): InvProfileService => ({
  getRiskType: Usecases.getRiskType(deps),
  assessRiskType: Usecases.assessRiskType(deps),
  clearRiskType: Usecases.clearRiskType(deps),

  getPlan: Usecases.getPlan(deps),
  createPlan: Usecases.createPlan(deps),
  updatePlan: Usecases.updatePlan(deps),
  clearPlan: Usecases.clearPlan(deps),
});
