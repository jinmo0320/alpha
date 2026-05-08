import { Request, Response } from "express";
import { isValidPlanReqDto } from "src/application/model/plan.model";
import { PlanService } from "../../service/plan/plan.service";

const readProjectId = (value: unknown): number | null => {
  const projectId = Number(value);
  return Number.isInteger(projectId) && projectId > 0 ? projectId : null;
};

const readPlanPayload = (body: any) => body.plan ?? body;

const badRequest = (res: Response, message: string) => {
  res.status(400).json({ success: false, message });
};

export const planController = (planService: PlanService) => ({
  getPlan: async (req: Request, res: Response) => {
    const projectId = readProjectId(req.query.projectId);
    if (!projectId) {
      badRequest(res, "projectId is required.");
      return;
    }

    const plan = await planService.getPlan({ projectId });
    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { plan },
    });
  },

  createPlan: async (req: Request, res: Response) => {
    const projectId = readProjectId(req.body.projectId ?? req.query.projectId);
    const plan = readPlanPayload(req.body);
    if (!projectId) {
      badRequest(res, "projectId is required.");
      return;
    }
    if (!isValidPlanReqDto(plan)) {
      badRequest(res, "Invalid plan request.");
      return;
    }

    await planService.createPlan({ projectId, plan });
    res.status(201).json({
      success: true,
      message: "Created plan.",
    });
  },

  updatePlan: async (req: Request, res: Response) => {
    const projectId = readProjectId(req.body.projectId ?? req.query.projectId);
    const plan = readPlanPayload(req.body);
    if (!projectId) {
      badRequest(res, "projectId is required.");
      return;
    }
    if (!isValidPlanReqDto(plan)) {
      badRequest(res, "Invalid plan request.");
      return;
    }

    await planService.updatePlan({ projectId, plan });
    res.status(200).json({
      success: true,
      message: "Updated plan.",
    });
  },

  clearPlan: async (req: Request, res: Response) => {
    const projectId = readProjectId(req.body.projectId ?? req.query.projectId);
    if (!projectId) {
      badRequest(res, "projectId is required.");
      return;
    }

    await planService.clearPlan(projectId);
    res.status(200).json({
      success: true,
      message: "Cleared plan.",
    });
  },
});
