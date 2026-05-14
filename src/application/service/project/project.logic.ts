import { Portfolio } from "src/application/model/portfolio.model";
import { Project } from "src/application/model/project.model";
import { User } from "src/application/model/user.model";

export const evaluateProject = (
  riskType: User.RiskType | null,
  project: Project.Res.Detail,
): {
  status: Project.Res.Detail["status"];
  warningCode: Project.Res.WarningCode;
} => {
  if (!project.plan)
    return {
      status: "PENDING",
      warningCode: "EMPTY_PLAN",
    };

  if (!project.portfolio)
    return {
      status: "PENDING",
      warningCode: "EMPTY_PORTFOLIO",
    };

  if (project.portfolio.status !== Portfolio.Res.Status.STABLE)
    return {
      status: "WARNING",
      warningCode: "INVALID_PORTFOLIO",
    };
};
