import { UUID } from "crypto";

export type JwtPayload = {
  userId: UUID;
};

export type TokenProvider = {
  generateAccessToken: (payload: JwtPayload) => string;
  generateRefreshToken: (payload: JwtPayload) => string;
  verifyAccessToken: (token: string) => JwtPayload | null;
  verifyRefreshToken: (token: string) => JwtPayload | null;
};
