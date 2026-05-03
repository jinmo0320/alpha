import { UUID } from "crypto";
import { InvProfileDeps } from "src/services/implementations/invProfile.service.impl";

/**
 * 예산 계획 비활성화
 */
type ClearPlan = (userId: UUID) => Promise<void>;

export const clearPlan =
  ({ invPlanRepository }: InvProfileDeps): ClearPlan =>
  async (userId) =>
    await invPlanRepository.deactivatePlans(userId as unknown as number);
