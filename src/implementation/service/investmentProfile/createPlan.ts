import { InvProfileDeps } from "src/implementation/service/investmentProfile/deps";
import {
  CreatePlanReqDto,
  isValidInvestmentPlanReqDto,
} from "src/application/service/investmentProfile/dto/invProfile.dto";
import { isValidInvestmentPlan } from "src/implementation/service/investmentProfile/logic/invProfile.logic";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";

type CreatePlan = (req: CreatePlanReqDto) => Promise<void>;

export const createPlan = ({
  invPlanRepository,
  paymentService,
}: InvProfileDeps): CreatePlan => {
  return async ({ userId, plan }) => {
    if (!isValidInvestmentPlanReqDto(plan)) {
      throw new DomainError(
        ErrorCodes.INV_PROFILE.INVALID_INVESTMENT_PLAN,
        "Invalid investment plan request: missing required fields",
      );
    }
    if (!isValidInvestmentPlan(plan)) {
      throw new DomainError(
        ErrorCodes.INV_PROFILE.INVALID_INVESTMENT_PLAN,
        "Invalid investment plan: calculated future value does not match target",
      );
    }
    const portfolioId = Number(plan.profileId);
    const planId = await invPlanRepository.createPlan(portfolioId, plan);
    await paymentService.generateSchedulesForPlan(planId, {
      startDate: plan.startDate,
      paymentDay: plan.paymentDay,
      period: plan.period,
      monthlyAmount: plan.monthlyAmount,
    });
  };
};
