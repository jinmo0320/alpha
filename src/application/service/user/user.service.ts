import { UUID } from "crypto";
import { User } from "src/application/model/user.model";

export type UserService = {
  /**
   * 사용자 정보를 조회
   * @param userId 사용자 ID
   * @errors USER_NOT_FOUND
   * @returns 사용자 정보
   */
  me: (userId: UUID) => Promise<User.Res.Root>;

  /**
   * 사용자 비밀번호를 변경
   * @param req 사용자 ID, 기존 비밀번호, 새 비밀번호
   * @errors WRONG_PASSWORD_FORMAT, CURRENT_PASSWORD_NOT_MATCHED
   * @returns 없음
   */
  changePassword: (req: User.Req.ChangePassword) => Promise<void>;

  /**
   * 사용자 이름과 태그를 변경
   * @param req 사용자 ID, 이름, 태그
   * @returns 변경된 사용자 정보
   */
  changeName: (req: User.Req.ChangeName) => Promise<User.Res.Root>;

  /**
   * 사용자를 탈퇴 처리
   * @param userId 탈퇴할 사용자 ID
   * @returns 없음
   */
  withdrawal: (userId: UUID) => Promise<void>;

  /**
   * 사용자 투자 성향을 설정
   * @param userId 사용자 ID
   * @param score 투자 성향 점수 또는 null
   * @errors USER_NOT_FOUND, INVALID_RISK_SCORE
   * @returns 없음
   */
  setRiskType: (userId: UUID, score: number | null) => Promise<void>;
};
