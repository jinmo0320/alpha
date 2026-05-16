import { Request, Response, NextFunction } from "express";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { createTokenProvider } from "src/externals/token/tokenProvider.impl";
import { createUserRepository } from "src/application/repository/user/user.repository.impl";

const tokenProvider = createTokenProvider();
const userRepository = createUserRepository();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* 1. Header에서 토큰 추출 */
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new DomainError(
        ErrorCodes.AUTH.TOKEN_REQUIRED,
        "Access token is required.",
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new DomainError(
        ErrorCodes.AUTH.TOKEN_REQUIRED,
        "Access token is required.",
      );
    }

    /* 2. 토큰 검증 */
    const payload = tokenProvider.verifyAccessToken(token);
    if (!payload) {
      throw new DomainError(
        ErrorCodes.AUTH.TOKEN_INVALID,
        "Invalid access token.",
      );
    }

    /* 3. 토큰 속 사용자 ID가 실제 유저인지 검증 */
    const user = await userRepository.findUserById(payload.userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found.");
    }

    /* 4. 토큰 속 사용자 정보 담아서 보냄 */
    req.userId = payload.userId;

    next();
  } catch (e) {
    next(e);
  }
};
