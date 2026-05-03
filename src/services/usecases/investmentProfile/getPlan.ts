import { UUID } from "crypto";
import { InvProfileDeps } from "src/services/implementations/invProfile.service.impl";


/**
 * 현재 활성 투자 계획 조회
 */
type GetPlan = (userId: UUID) => Promise<any>;

export const getPlan = (deps: InvProfileDeps): GetPlan => async (userId: UUID) => {
    return await deps.invPlanRepository.getActivePlan(userId as unknown as number);
}
