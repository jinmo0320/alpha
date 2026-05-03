import { InvProfileDeps } from "src/implementation/service/investmentProfile/deps";
import { AssessRiskTypeReqDto } from "src/application/service/investmentProfile/dto/invProfile.dto";
import { User } from "src/application/repository/user/entity/user.entity";
import { determineRiskType } from "src/implementation/service/user/logic/user.logic";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";

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
