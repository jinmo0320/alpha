import { UUID } from "crypto";
import { User } from "src/domain/user/user.entity";
import { validatePassword } from "src/domain/auth/auth.logic";

import { UserRepository } from "src/repositories/interfaces/user.repository";
import { BcryptHelper } from "src/providers/interfaces/user.external";

import { ChangePasswordReqDto } from "src/services/dtos/user.dto";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";
import { UserService } from "src/services/interfaces/user.service";

type UserDeps = {
  userRepository: UserRepository;
  BcryptHelper: BcryptHelper;
};

export const createUserService = ({
  userRepository,
  BcryptHelper,
}: UserDeps): UserService => ({
  me: async (userId) => {
    /* 0. User 조회 */
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }
    return user;
  },

  changePassword: async ({ userId, oldPassword, newPassword }) => {
    /* [Error] input validation */
    if (validatePassword(oldPassword) || validatePassword(newPassword))
      throw new DomainError(
        ErrorCodes.AUTH.WRONG_PASSWORD_FORMAT,
        "The password format is incorrect.",
      );

    /* [Error] Password mismatch */
    const userPassword = await userRepository.getUserPassword(userId);
    if (
      !userPassword ||
      !(await BcryptHelper.comparePassword(
        oldPassword,
        userPassword.hashedPassword,
      ))
    )
      throw new DomainError(
        ErrorCodes.USER.CURRENT_PASSWORD_NOT_MATCHED,
        "Your current password is incorrect.",
      );

    /* 0. 새 비밀번호 해싱 */
    const hashedNewPassword = await BcryptHelper.hashPassword(newPassword);
    /* 1. 비밀번호 업데이트 */
    await userRepository.updateUserPassword(userId, hashedNewPassword);
  },
});
