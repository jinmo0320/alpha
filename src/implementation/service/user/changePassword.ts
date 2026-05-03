import { validatePassword } from "src/implementation/service/auth/logic/auth.logic";
import { ChangePasswordReqDto } from "src/application/service/user/dto/user.dto";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";
import { UserDeps } from "./deps";

export const createChangePassword =
  ({ userRepository, BcryptHelper }: UserDeps) =>
  async ({
    userId,
    oldPassword,
    newPassword,
  }: ChangePasswordReqDto): Promise<void> => {
    if (validatePassword(oldPassword) || validatePassword(newPassword)) {
      throw new DomainError(
        ErrorCodes.AUTH.WRONG_PASSWORD_FORMAT,
        "The password format is incorrect.",
      );
    }

    const userPassword = await userRepository.getUserPassword(userId);
    if (
      !userPassword ||
      !(await BcryptHelper.comparePassword(
        oldPassword,
        userPassword.hashedPassword,
      ))
    ) {
      throw new DomainError(
        ErrorCodes.USER.CURRENT_PASSWORD_NOT_MATCHED,
        "Your current password is incorrect.",
      );
    }

    const hashedNewPassword = await BcryptHelper.hashPassword(newPassword);
    await userRepository.updateUserPassword(userId, hashedNewPassword);
  };
