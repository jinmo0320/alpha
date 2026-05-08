import {
  CheckCodeReqDto,
  LoginReqDto,
  LoginResDto,
  RefreshTokenResDto,
  RegisterReqDto,
  RegisterResDto,
  ResetPasswordReqDto,
  SendCodeResDto,
} from "src/application/model/auth.model";

export type AuthService = {
  /**
   * 회원가입
   * @param   email
   * @param   password
   * @errors  EMAIL_ALREADY_REGISTERED, EMAIL_NOT_VERIFIED, WRONG_EMAIL_FORMAT, WRONG_PASSWORD_FORMAT
   * @returns JWT access token, refresh token and user data
   */
  register: (req: RegisterReqDto) => Promise<RegisterResDto>;
  /**
   * 로그인
   * @param   email
   * @param   password
   * @errors  LOGIN_FAILED, WRONG_EMAIL_FORMAT, WRONG_PASSWORD_FORMAT
   * @returns JWT access token, refresh token and user data
   */
  login: (req: LoginReqDto) => Promise<LoginResDto>;
  /**
   * 인증코드 이메일 전송
   * @param   email
   * @errors  EMAIL_ALREADY_REGISTERED, WRONG_EMAIL_FORMAT
   * @returns 인증코드 생성 시각과 만료 시각
   */
  sendVerificationCode: (email: string) => Promise<SendCodeResDto>;
  /**
   * 인증코드 검증
   * @param   email
   * @param   code
   * @errors  EMAIL_VERIFICATION_FAILED
   */
  checkVerificationCode: (req: CheckCodeReqDto) => Promise<void>;
  /**
   * 비밀번호 찾기 인증코드 이메일 전송
   * @param   email
   * @errors  EMAIL_NOT_REGISTERED, WRONG_EMAIL_FORMAT
   * @returns 인증코드 생성 시각과 만료 시각
   */
  sendForgotCode: (email: string) => Promise<SendCodeResDto>;
  /**
   * 비밀번호 찾기 인증코드 검증
   * @param   email
   * @param   code
   * @errors  EMAIL_VERIFICATION_FAILED
   */
  checkForgotCode: (req: CheckCodeReqDto) => Promise<void>;
  /**
   * 비밀번호 재설정
   * @param email
   * @param newPassword
   * @errors  EMAIL_NOT_VERIFIED, WRONG_PASSWORD_FORMAT, USER_NOT_FOUND
   */
  resetPassword: (req: ResetPasswordReqDto) => Promise<void>;
  /**
   * 토큰 재발급
   * @param   refreshToken
   * @errors  TOKEN_INVALID
   * @returns JWT access token and refresh token
   */
  refreshToken: (refreshToken: string) => Promise<RefreshTokenResDto>;
};
