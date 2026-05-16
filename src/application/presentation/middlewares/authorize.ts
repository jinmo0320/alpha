import { Request, Response, NextFunction } from "express";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { createProjectRepository } from "src/application/repository/project/project.repository.impl";

const projectRepository = createProjectRepository();

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* 프로젝트 소유권 확인 */
    const userId = req.userId!;
    const projectId = Number(req.params.projectId);
    const hasProject = await projectRepository.hasProject(userId, projectId);
    if (!hasProject) {
      throw new DomainError(
        ErrorCodes.PROJECT.ACCESS_DENIED,
        "user can't access this project",
      );
    }
    /* 소유했다면 프로젝트 정보 담아 보냄 */
    req.projectId = projectId;

    next();
  } catch (e) {
    next(e);
  }
};
