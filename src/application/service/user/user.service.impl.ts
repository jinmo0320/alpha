import { UUID } from "crypto";
import { UserDeps } from "./user.deps";
import { UserService } from "./user.service";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { validatePassword, determineRiskType } from "./user.logic";
import { User } from "src/application/model/user.model";

export const createUserService = ({
  userRepository,
  BcryptHelper,
}: UserDeps): UserService => ({
  me: async (userId: UUID) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }

    return User.Map.toRoot(user);
  },

  changePassword: async ({ userId, oldPassword, newPassword }) => {
    if (!validatePassword(oldPassword) || !validatePassword(newPassword)) {
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

  changeName: async (req) => {
    // 중복 확인
    const existingUser = await userRepository.findUserByName(req.name, req.tag);
    if (existingUser && existingUser.id !== req.userId) {
      throw new DomainError(
        ErrorCodes.USER.NAME_ALREADY_EXISTS,
        "This name and tag are already in use.",
      );
    }

    // 이름 변경
    await userRepository.updateUserName(req);

    const updatedUser = await userRepository.findUserById(req.userId);
    if (!updatedUser) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }

    return User.Map.toRoot(updatedUser);
  },

  withdrawal: async (userId) => {
    await userRepository.delete(userId);
  },

  setRiskType: async (userId, score) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new DomainError(ErrorCodes.USER.NOT_FOUND, "User not found");
    }

    /* 점수 변환 */
    if (score !== null) {
      const riskType = determineRiskType(score);
      if (!riskType) {
        throw new DomainError(
          ErrorCodes.USER.INVALID_RISK_SCORE,
          "The provided risk score is invalid.",
        );
      }
      await userRepository.setRiskType(userId, riskType);
      return riskType;
    } else {
      await userRepository.setRiskType(userId, null);
      return null;
    }
  },
});
