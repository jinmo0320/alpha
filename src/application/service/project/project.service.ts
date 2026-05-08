import { UUID } from "crypto";
import { ProjectDto } from "src/application/model/project.model";

export type ProjectService = {
  /**
   * Creates a new project.
   * @param info user id and project name
   */
  createProject: (info: ProjectDto.Request.Create) => Promise<void>;

  /**
   * Retrieves a list of projects for a given user.
   * @param userId user id
   * @returns a list of projects (abstracted)
   */
  getProjectList: (userId: UUID) => Promise<ProjectDto.Response.Abstract[]>;

  /**
   * Retrieves detailed information about a specific project.
   * @param projectId project id
   * @returns detailed information about the project, or null if not found
   */
  getProject: (projectId: number) => Promise<ProjectDto.Response.Detail | null>;
};
