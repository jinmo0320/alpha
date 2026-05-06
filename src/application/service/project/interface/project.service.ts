export type ProjectService = {
  createProject: (userId: number, projectData: any) => Promise<void>;
  getAllProjects: (userId: number) => Promise<any[]>;
  getProject: (projectId: number) => Promise<any>;
};
