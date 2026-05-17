import { UUID } from "crypto";

export type AuthRepository = {
  /**
   * 이메일 인증 코드를 저장
   * @param email 사용자 이메일
   * @param code 인증 코드
   * @returns 없음
   */
  saveVerificationCode: (email: string, code: string) => Promise<void>;

  /**
   * 이메일 인증 코드를 확인
   * @param email 사용자 이메일
   * @param code 인증 코드
   * @returns 인증 성공 여부
   */
  checkVerificationCode: (email: string, code: string) => Promise<boolean>;

  /**
   * 이메일 인증 코드를 삭제
   * @param email 사용자 이메일
   * @returns 없음
   */
  deleteVerificationCode: (email: string) => Promise<void>;

  /**
   * 이메일 인증 상태로 변경
   * @param email 사용자 이메일
   * @returns 없음
   */
  setEmailVerified: (email: string) => Promise<void>;

  /**
   * 이메일 미인증 상태로 변경
   * @param email 사용자 이메일
   * @returns 없음
   */
  setEmailUnverified: (email: string) => Promise<void>;

  /**
   * 이메일 인증 여부를 조회
   * @param email 사용자 이메일
   * @returns 이메일 인증 여부
   */
  isEmailVerified: (email: string) => Promise<boolean>;

  /**
   * 리프레시 토큰을 저장
   * @param userId 사용자 ID
   * @param token 리프레시 토큰
   * @returns 없음
   */
  saveRefreshToken: (userId: UUID, token: string) => Promise<void>;

  /**
   * 리프레시 토큰을 확인
   * @param userId 사용자 ID
   * @param token 리프레시 토큰
   * @returns 토큰 일치 여부
   */
  checkRefreshToken: (userId: UUID, token: string) => Promise<boolean>;

  /**
   * 리프레시 토큰을 삭제
   * @param userId 사용자 ID
   * @returns 없음
   */
  deleteRefreshToken: (userId: UUID) => Promise<void>;
};
