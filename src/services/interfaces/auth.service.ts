import {
  CheckCodeReqDto,
  LoginReqDto,
  LoginResDto,
  RefreshTokenResDto,
  RegisterReqDto,
  RegisterResDto,
  ResetPasswordReqDto,
  SendCodeResDto,
} from "src/services/dtos/auth.dto";

export type AuthService = {
  register: (req: RegisterReqDto) => Promise<RegisterResDto>;
  login: (req: LoginReqDto) => Promise<LoginResDto>;
  sendVerificationCode: (email: string) => Promise<SendCodeResDto>;
  checkVerificationCode: (req: CheckCodeReqDto) => Promise<void>;
  sendForgotCode: (email: string) => Promise<SendCodeResDto>;
  checkForgotCode: (req: CheckCodeReqDto) => Promise<void>;
  resetPassword: (req: ResetPasswordReqDto) => Promise<void>;
  refreshToken: (refreshToken: string) => Promise<RefreshTokenResDto>;
};
