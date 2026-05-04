import { Request, Response } from "express";
import { InvProfileService } from "../../service/investmentProfile/interface/invProfile.service";

export const invProfileController = (invProfileService: InvProfileService) => ({
  getInvestmentPlan: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const plan = await invProfileService.getPlan(userId);
    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { plan },
    });
  },

  createInvestmentPlan: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { plan } = req.body;
    await invProfileService.createPlan({ userId, plan });
    res.status(201).json({
      success: true,
      message: "Created investment plan.",
    });
  },

  updateInvestmentPlan: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { plan } = req.body;
    await invProfileService.updatePlan({ userId, plan });
    res.status(200).json({
      success: true,
      message: "Updated investment plan.",
    });
  },

  clearInvestmentPlan: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await invProfileService.clearPlan(userId);
    res.status(200).json({
      success: true,
      message: "Cleared investment plan.",
    });
  },
});
