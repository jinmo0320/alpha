import { User } from "src/application/model/user.model";

/**
 * 비밀번호 검증
 * - 영문자
 * - 숫자
 * - 특수문자 !@#$%^&*()_+={}[]|\:;"'<>,.?/-
 * - 8자 이상
 * @param password 비밀번호
 * @returns 비밀번호 형식을 지켰니
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * 설문 점수로 투자 성향 결정
 * @param score 총 설문 점수
 * @returns 투자 성향 타입 또는 null (유효하지 않은 점수)
 */
export const determineRiskType = (
  score: number,
): User.Entity.RiskType | null => {
  if (score < 10) return null;
  if (score >= 10 && score <= 15) return "STABLE";
  if (score <= 20) return "STABLE_SEEK";
  if (score <= 25) return "NEUTRAL";
  if (score <= 30) return "ACTIVE";
  if (score <= 40) return "AGGRESSIVE";

  return null;
};
