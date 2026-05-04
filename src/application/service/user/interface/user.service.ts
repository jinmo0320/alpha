import { UUID } from "crypto";
import { UserDto, ChangePasswordReqDto, RiskTypeDto } from "../dto/user.dto";

export type UserService = {
  /**
   * 사용자 정보 조회 함수
   * @param userId 조회할 사용자의 UUID
   * @errors USER_NOT_FOUND
   * @returns 사용자 정보 객체
   */
  me: (userId: UUID) => Promise<UserDto>;
  /**
   * 비밀번호 변경 함수
   * @param req userId, currentPassword, newPassword를 포함하는 객체
   * @errors WRONG_PASSWORD_FORMAT, CuRRENT_PASSWORD_NOT_MATCHED
   */
  changePassword: (req: ChangePasswordReqDto) => Promise<void>;
  /**
   * 투자 성향 설정 함수
   * @param userId 투자 성향을 설정할 사용자의 UUID
   * @param score 투자 성향 점수 또는 null
   */
  setRiskType: (userId: UUID, score: number | null) => Promise<void>;
};
