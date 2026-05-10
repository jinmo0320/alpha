import { Request, Response } from "express";
import { PlanService } from "../../service/plan/plan.service";

export const planController = (planService: PlanService) => ({
  createPlan: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const {
      initialAmount,
      monthlyAmount,
      period,
      expectedReturn,
      targetAmount,
    } = req.body;

    const plan = await planService.createPlan({
      projectId,
      initialAmount,
      monthlyAmount,
      period,
      expectedReturn,
      targetAmount,
    });

    res.status(201).json({
      success: true,
      message: "Created plan.",
      data: { plan },
    });
  },

  getPlan: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const plan = await planService.getPlan(projectId);

    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { plan },
    });
  },
});
