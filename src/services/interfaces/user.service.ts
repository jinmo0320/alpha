import { UUID } from "crypto";
import { User } from "src/domain/user/user.entity";
import { ChangePasswordReqDto } from "src/services/dtos/user.dto";

export type UserService = {
  me: (userId: UUID) => Promise<User.Info>;
  changePassword: (req: ChangePasswordReqDto) => Promise<void>;
};
