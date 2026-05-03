import { UUID } from "crypto";
import { User } from "src/application/repository/user/entity/user.entity";
import { ChangePasswordReqDto } from "src/application/service/user/dto/user.dto";

export type UserService = {
  me: (userId: UUID) => Promise<User.Info>;
  changePassword: (req: ChangePasswordReqDto) => Promise<void>;
};
