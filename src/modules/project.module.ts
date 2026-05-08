import { Router } from "express";
import { projectController } from "../application/presentation/controllers/project.controller";
import { authenticate } from "../application/presentation/middlewares/authMiddleware";
import { createProjectRepository } from "../application/repository/project/project.repository.impl";
import { createProjectService } from "../application/service/project/project.service.impl";

const router = Router();

const ctrl = projectController(
  createProjectService(createProjectRepository()),
);

router.get("/", authenticate, ctrl.getAllProjects);
router.get("/:id", authenticate, ctrl.getProject);
router.post("/", authenticate, ctrl.createProject);

export default router;
