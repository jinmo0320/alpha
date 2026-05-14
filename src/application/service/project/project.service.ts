import { UUID } from "crypto";
import { Project } from "src/application/model/project.model";

export type ProjectService = {
  /**
   * Creates a new project.
   * @param info user id and project name
   */
  createProject: (info: Project.Req.Create) => Promise<Project.Res.Abstract>;

  /**
   * Retrieves a list of projects for a given user.
   * @param userId user id
   * @returns a list of projects (abstracted)
   */
  getProjectList: (userId: UUID) => Promise<Project.Res.Abstract[]>;

  /**
   * Retrieves detailed information about a specific project.
   * @param userId user id
   * @param projectId project id
   * @returns detailed information about the project, or null if not found
   */
  getProject: (
    userId: UUID,
    projectId: number,
  ) => Promise<Project.Res.Detail | null>;
};
