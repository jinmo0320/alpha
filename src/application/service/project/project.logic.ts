import { Project } from "src/application/model/project.model";
import { User } from "src/application/model/user.model";

const EXPECTED_RETURN_TOLERANCE = 0.005;

export const getRiskTypePercent = (
  riskType: User.Entity.RiskType,
): {
  min: number;
  max: number;
} => {
  switch (riskType) {
    case "STABLE":
      return { min: 2, max: 4 };
    case "STABLE_SEEK":
      return { min: 4, max: 6 };
    case "NEUTRAL":
      return { min: 6, max: 8 };
    case "ACTIVE":
      return { min: 8, max: 12 };
    case "AGGRESSIVE":
      return { min: 12, max: 30 };
  }
};

export const evaluateProject = (
  riskType: User.Entity.RiskType | null,
  project: Project.Res.Detail,
): {
  status: Project.Entity.Status;
  warningCode: Project.Res.WarningCode | null;
} => {
  const { plan, portfolio } = project;

  // NULL PLAN
  if (!plan)
    return {
      status: "PENDING",
      warningCode: "EMPTY_PLAN",
    };

  // NULL PORTFOLIO
  if (!portfolio)
    return {
      status: "PENDING",
      warningCode: "EMPTY_PORTFOLIO",
    };

  // INVALID PORTFOLIO
  if (portfolio.status !== "STABLE")
    return {
      status: "WARNING",
      warningCode: "INVALID_PORTFOLIO",
    };

  // NULL RISK TYPE
  if (!riskType)
    return {
      status: "WARNING",
      warningCode: "TYPE_PLAN_MISMATCH",
    };

  // PLAN AND RISK TYPE MISMATCH
  const expectedReturnPercent = plan.expectedReturn * 100;
  const { min, max } = getRiskTypePercent(riskType);
  if (
    expectedReturnPercent < min ||
    (max !== null && expectedReturnPercent > max)
  )
    return {
      status: "WARNING",
      warningCode: "TYPE_PLAN_MISMATCH",
    };

  const isExpectedReturnInPortfolioRange =
    plan.expectedReturn >= portfolio.minReturn &&
    plan.expectedReturn <= portfolio.maxReturn;
  const expectedReturnDistanceFromPortfolioRange = Math.min(
    Math.abs(plan.expectedReturn - portfolio.minReturn),
    Math.abs(plan.expectedReturn - portfolio.maxReturn),
  );

  if (
    !isExpectedReturnInPortfolioRange &&
    expectedReturnDistanceFromPortfolioRange > EXPECTED_RETURN_TOLERANCE
  )
    return {
      status: "WARNING",
      warningCode: "PLAN_PORTFOLIO_MISMATCH",
    };

  return {
    status: "STABLE",
    warningCode: null,
  };
};
