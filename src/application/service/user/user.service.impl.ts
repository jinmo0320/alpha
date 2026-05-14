import { UUID } from "crypto";
import { UserDeps } from "./user.deps";
import { UserService } from "./user.service";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { validatePassword, determineRiskType } from "./user.logic";

export const createUserService = ({
  userRepository,
  BcryptHelper,
}: UserDeps): UserService => ({
  me: async (userId: UUID) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      tag: user.tag,
      riskType: user.riskType,
    };
  },

  changePassword: async ({ userId, oldPassword, newPassword }) => {
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
  },

  setRiskType: async (userId, score) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }
    if (score !== null) {
      const riskType = determineRiskType(score);
      if (!riskType) {
        throw new DomainError(
          ErrorCodes.USER.INVALID_RISK_SCORE,
          "The provided risk score is invalid.",
        );
      }
      await userRepository.setRiskType(userId, riskType);
    } else {
      await userRepository.setRiskType(userId, null);
    }
  },
});
