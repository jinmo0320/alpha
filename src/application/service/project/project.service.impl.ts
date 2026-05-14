import { ProjectService } from "./project.service";
import { Project } from "src/application/model/project.model";
import { ProjectDeps } from "./project.deps";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";

export const createProjectService = ({
  projectRepository,
  userRepository,
  portfolioService,
  planService,
}: ProjectDeps): ProjectService => ({
  createProject: async (info) => {
    const { userId, name } = info;
    const project = await projectRepository.create({ userId, name });
    return Project.Map.toAbstract(project);
  },

  getProjectList: async (userId) => {
    const projects = await projectRepository.getAll(userId);
    return projects.map(Project.Map.toAbstract);
  },

  getProject: async (userId, projectId) => {
    const riskType = userRepository.getRiskType(userId);

    const project = await projectRepository.get(projectId);
    if (!project)
      throw new DomainError(ErrorCodes.PROJECT.NOT_FOUND, "project not found.");

    const portfolio = await portfolioService.getPortfolio(project.id);
    const plan = await planService.getPlan(project.id);

    const projectReturn: Project.Res.Detail = {
      ...project,
      portfolio,
      plan,
    };

    return projectReturn;
  },
});
