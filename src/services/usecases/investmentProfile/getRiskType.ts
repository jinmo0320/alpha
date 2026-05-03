import { UserRepository } from "src/repositories/interfaces/user.repository";
import { UUID } from "crypto";

/**
 * 유저의 투자 성향 조회
 */
type GetRiskType = (userId: UUID) => Promise<any>;

export const getRiskType = (deps: {
  userRepository: UserRepository;
}): GetRiskType => {
  return async (userId: UUID) => {
    const riskType = await deps.userRepository.getRiskType(userId);
    return riskType;
  };
};
