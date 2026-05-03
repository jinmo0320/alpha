import { UUID } from "crypto";
import { User } from "src/application/repository/user/entity/user.entity";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";
import { UserDeps } from "./deps";

export const createMe =
  ({ userRepository }: UserDeps) =>
  async (userId: UUID): Promise<User.Info> => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }
    return user;
  };
