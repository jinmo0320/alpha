import { Request, Response } from "express";
import { ProjectService } from "../../service/project/project.service";

export const projectController = (projectService: ProjectService) => ({
  /* ================= 프로젝트 생성 ================= */
  createProject: async (req: Request, res: Response) => {
    await projectService.createProject(req.user!.id, req.body);
    res.status(201).json({
      success: true,
      message: "Created project.",
    });
  },

  /* ================= 모든 프로젝트 조회 ================= */
  getAllProjects: async (req: Request, res: Response) => {},

  /* ================= 특정 프로젝트 조회 ================= */
  getProject: async (req: Request, res: Response) => {},
});
