import { Router } from "express";
import { projectController } from "../application/presentation/controllers/project.controller";
import { authenticate } from "../application/presentation/middlewares/authenticate";
import { createProjectRepository } from "../application/repository/project/project.repository.impl";
import { createProjectService } from "../application/service/project/project.service.impl";
import { authorize } from "src/application/presentation/middlewares/authorize";
import { ProjectDeps } from "src/application/service/project/project.deps";
import { createUserRepository } from "src/application/repository/user/user.repository.impl";
import { createPortfolioService } from "src/application/service/portfolio/portfolio.service.impl";
import { createPlanService } from "src/application/service/plan/plan.service.impl";
import { PlanDeps } from "src/application/service/plan/plan.deps";
import { PortfolioDeps } from "src/application/service/portfolio/portfolio.deps";
import { createPortfolioRepository } from "src/application/repository/portfolio/implementation/portfolio.repository.impl";
import { createPlanRepository } from "src/application/repository/plan/plan.repository.impl";
import { createCategoryRepository } from "src/application/repository/portfolio/implementation/category.repository.impl";

const router = Router();

const depsPortfolio: PortfolioDeps = {
  portfolioRepository: createPortfolioRepository(),
  planRepository: createPlanRepository(),
  categoryRepository: createCategoryRepository(),
};
const depsPlan: PlanDeps = {
  planRepository: createPlanRepository(),
};

const deps: ProjectDeps = {
  projectRepository: createProjectRepository(),
  userRepository: createUserRepository(),
  portfolioService: createPortfolioService(depsPortfolio),
  planService: createPlanService(depsPlan),
};
const service = createProjectService(deps);
const ctrl = projectController(service);

router.post("/", authenticate, ctrl.createProject);
router.get("/", authenticate, ctrl.getAllProjects);
router.get("/:projectId", authenticate, authorize, ctrl.getProject);

export default router;
