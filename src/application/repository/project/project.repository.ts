import { UUID } from "crypto";

export type ProjectRepository = {
  createProject: (userId: UUID, name: string) => Promise<void>;
  getProjectList: (userId: UUID) => Promise<any[]>;
  getProject: (projectId: number) => Promise<any | null>;
};
