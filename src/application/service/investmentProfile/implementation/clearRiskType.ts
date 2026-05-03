import { UUID } from "crypto";
import { InvProfileDeps } from "src/implementation/service/investmentProfile/deps";

/**
 * 유저의 투자 성향 비우기
 */
type ClearRiskType = (userId: UUID) => Promise<void>;

export const clearRiskType =
  ({ userRepository }: InvProfileDeps): ClearRiskType =>
  async (userId) =>
    await userRepository.setRiskType(userId, null);
