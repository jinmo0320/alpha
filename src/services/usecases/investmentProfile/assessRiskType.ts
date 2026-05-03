import { InvProfileDeps } from "src/services/implementations/invProfile.service.impl";
import { AssessRiskTypeReqDto } from "src/services/dtos/invProfile.dto";
import { User } from "src/domain/user/user.entity";
import { determineRiskType } from "src/domain/user/user.logic";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";

/**
 * 설문 점수로 유저의 투자 성향 업데이트
 */
type AssessRiskType = (req: AssessRiskTypeReqDto) => Promise<User.RiskType>;

export const assessRiskType =
  ({ userRepository }: InvProfileDeps): AssessRiskType =>
  async ({ userId, score }) => {
    const riskType = determineRiskType(score);
    if (!riskType) {
      throw new DomainError(
        ErrorCodes.INV_PROFILE.INVALID_RISK_SCORE,
        "Invalid risk assessment score",
      );
    }
    await userRepository.setRiskType(userId, riskType);
    return riskType;
  };
