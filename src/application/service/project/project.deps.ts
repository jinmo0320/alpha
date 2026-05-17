import { PlanRepository } from "src/application/repository/plan/plan.repository";
import { PortfolioRepository } from "src/application/repository/portfolio/interface/portfolio.repository";
import { ProjectRepository } from "src/application/repository/project/project.repository";
import { PortfolioService } from "../portfolio/portfolio.service";
import { PlanService } from "../plan/plan.service";
import { UserRepository } from "src/application/repository/user/user.repository";

export type ProjectDeps = {
  projectRepository: ProjectRepository;
  userRepository: UserRepository;
  portfolioService: PortfolioService;
  planService: PlanService;
};
