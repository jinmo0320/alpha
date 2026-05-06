import { Request, Response } from "express";

export const projectController = (projectService: any) => ({
  /* ================= 프로젝트 생성 ================= */
  createProject: async (req: Request, res: Response) => {},

  /* ================= 모든 프로젝트 조회 ================= */
  getAllProjects: async (req: Request, res: Response) => {
    const projects = await projectService.getAllProjects(req.user!.id);
    res.status(200).json({
      success: true,
      message: "get all projects",
      data: { projects },
    });
  },

  /* ================= 특정 프로젝트 조회 ================= */
  getProject: async (req: Request, res: Response) => {
    const project = await projectService.getProject(req.params.id);
    res.status(200).json({
      success: true,
      message: "get project info",
      data: { project: null },
    });
  },
});
