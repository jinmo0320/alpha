/**
 * 이메일 검증
 * - 영문, 숫자, 특수기호
 * - @
 * - 도메인 주소 형식
 * @param email 이메일
 * @returns 이메일 형식을 지켰니
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

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
 * 이메일 인증 코드 생성
 * - 6자리 무작위 숫자
 * @returns 이메일 인증 코드
 */
export const generateVerificationCode = () =>
  Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

/**
 * 닉네임 생성 함수
 * @returns 무작위 닉네임
 */
export const generateName = (): string => {
  const adjectives = [
    "용감한",
    "행복한",
    "빛나는",
    "빠른",
    "조용한",
    "친절한",
    "똑똑한",
    "강인한",
    "신비한",
    "우아한",
    "날렵한",
    "포근한",
    "명랑한",
    "대담한",
    "차분한",
    "위대한",
    "영리한",
    "듬직한",
    "고요한",
    "활기찬",
  ];
  const nouns = [
    "사자",
    "호랑이",
    "독수리",
    "거북이",
    "돌고래",
    "나무",
    "바람",
    "구름",
    "바다",
    "하늘",
    "태양",
    "별빛",
    "올빼미",
    "여우",
    "고양이",
    "곰",
    "파도",
    "숲",
    "산들바람",
    "불꽃",
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
};

/**
 * 태그 생성 함수
 * @param length tag 길이
 * @returns length 길이의 무작위 숫자 생성
 */
export const generateTag = (length: number = 6): string => {
  const max = Math.pow(10, length) - 1;
  const randomNum = Math.floor(Math.random() * (max + 1));
  return randomNum.toString().padStart(length, "0");
};
