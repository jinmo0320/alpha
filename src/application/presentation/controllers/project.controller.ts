import { Request, Response } from "express";
import { ProjectService } from "../../service/project/project.service";

export const projectController = (projectService: ProjectService) => ({
  /* ================= 프로젝트 생성 ================= */
  createProject: async (req: Request, res: Response) => {
    const userId = req.userId!;
    const { name } = req.body;
    const project = await projectService.createProject({ userId, name });

    res.status(201).json({
      success: true,
      message: "Created project.",
      data: { project },
    });
  },

  /* ================= 특정 프로젝트 조회 ================= */
  getProject: async (req: Request, res: Response) => {
    const userId = req.userId!;
    const projectId = req.projectId!;
    const project = await projectService.getProject(userId, projectId);

    res.status(200).json({
      success: true,
      message: "Project fetched successfully.",
      data: { project },
    });
  },

  /* ================= 모든 프로젝트 조회 ================= */
  getAllProjects: async (req: Request, res: Response) => {
    const userId = req.userId!;
    const projects = await projectService.getProjectList(userId);

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully.",
      data: { projects },
    });
  },
});
