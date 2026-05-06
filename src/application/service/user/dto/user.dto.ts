import { UUID } from "crypto";
import { User } from "src/application/repository/user/entity/user.entity";

export type RiskTypeDto =
  | "STABLE"
  | "STABLE_SEEK"
  | "NEUTRAL"
  | "ACTIVE"
  | "AGGRESSIVE";

export type UserDto = {
  id: UUID;
  email: string;
  name: string;
  tag: string;
  riskType: RiskTypeDto | null;
};

export type ChangePasswordReqDto = {
  userId: UUID;
  oldPassword: string;
  newPassword: string;
};
