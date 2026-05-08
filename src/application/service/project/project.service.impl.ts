import { ProjectRepository } from "src/application/repository/project/project.repository";
import { ProjectService } from "./project.service";
import { PortfolioRepository } from "src/application/repository/portfolio/interface/portfolio.repository";

export const createProjectService = (
  projectRepository: ProjectRepository,
  portfolioRepository: PortfolioRepository,
): ProjectService => ({
  createProject: async (info) => {
    const { userId, name } = info;
    await projectRepository.createProject(userId, name);
  },

  getProjectList: async (userId) => {
    const projects = await projectRepository.getProjectList(userId);
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      status: project.status,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }));
  },

  getProject: async (projectId) => {
    const project = await projectRepository.getProject(projectId);
    if (!project) return null;

    return {};
  },
});
