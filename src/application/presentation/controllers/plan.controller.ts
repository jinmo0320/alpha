import { Request, Response } from "express";
import { PlanService } from "../../service/plan/plan.service";

export const planController = (planService: PlanService) => ({
  /* ================= 플랜 생성 ================= */
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

  /* ================= 프로젝트의 현재 플랜 가져오기 ================= */
  getPlan: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const plan = await planService.getPlan(projectId);

    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { plan },
    });
  },

  /* ================= 모든 플랜 가져오기 ================= */
  getAllPlans: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const plan = await planService.getPlan(projectId);

    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { plan },
    });
  },

  /* ================= 플랜 날짜 설정 ================= */
  setDate: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const { startDate, paymentDay } = req.body;

    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: {},
    });
  },

  /* ================= 플랜 수정하기 ================= */
  updatePlan: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const {
      initialAmount,
      monthlyAmount,
      period,
      expectedReturn,
      targetAmount,
      startDate,
      paymentDay,
    } = req.body;

    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: {},
    });
  },
});
