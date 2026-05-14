import { UUID } from "crypto";
import { User } from "src/application/model/user.model";

export type UserRepository = {
  /**
   * 사용자를 생성
   * @param req 사용자 등록 정보 (이메일, 이름, 태그, 비밀번호)
   * @returns 생성된 사용자 정보
   */
  create: (req: User.Req.Create) => Promise<User.Entity>;

  /**
   * 사용자를 삭제
   * @param userId 삭제할 사용자 ID
   * @returns 없음
   */
  delete: (userId: UUID) => Promise<void>;

  /**
   * ID로 사용자를 조회
   * @param userId 사용자 ID
   * @returns 사용자 정보 또는 null
   */
  findUserById: (userId: UUID) => Promise<User.Entity | null>;

  /**
   * 이메일로 사용자를 조회
   * @param email 사용자 이메일
   * @returns 사용자 정보 또는 null
   */
  findUserByEmail: (email: string) => Promise<User.Entity | null>;

  /**
   * 이름과 태그로 사용자를 조회
   * @param name 사용자 이름
   * @param tag 사용자 태그
   * @returns 사용자 정보 또는 null
   */
  findUserByName: (name: string, tag: string) => Promise<User.Entity | null>;

  /**
   * 사용자 비밀번호를 업데이트
   * @param id 사용자 ID
   * @param hashedPassword 해시된 비밀번호
   * @returns 없음
   */
  updateUserPassword: (id: UUID, hashedPassword: string) => Promise<void>;

  /**
   * 사용자 비밀번호를 조회
   * @param userId 사용자 ID
   * @returns 사용자 비밀번호 정보 또는 null
   */
  getUserPassword: (userId: UUID) => Promise<User.Res.Password | null>;

  /**
   * 사용자 이름과 태그를 업데이트
   * @param req 사용자 ID, 이름, 태그
   * @returns 없음
   */
  updateUserName: (req: User.Req.ChangeName) => Promise<void>;

  /**
   * 사용자 투자 유형을 조회
   * @param userId 사용자 ID
   * @returns 투자 유형 또는 null
   */
  getRiskType: (userId: UUID) => Promise<User.Entity.RiskType | null>;

  /**
   * 사용자 투자 유형을 업데이트
   * @param userId 사용자 ID
   * @param riskType 투자 유형 또는 null
   * @returns 업데이트된 사용자 정보
   */
  setRiskType: (
    userId: UUID,
    riskType: User.Entity.RiskType | null,
  ) => Promise<User.Entity>;
};
