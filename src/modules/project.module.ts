import { Router } from "express";
import { projectController } from "src/application/presentation/controllers/project.controller";
import { authenticate } from "src/application/presentation/middlewares/authMiddleware";

const router = Router();

const ctrl = projectController(null);

router.get("/", authenticate, ctrl.getAllProjects);
router.get("/:id", authenticate, ctrl.getProject);
router.post("/", authenticate, ctrl.createProject);

export default router;
