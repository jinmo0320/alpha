import { Request, Response } from "express";
import { PortfolioService } from "../../service/portfolio/portfolio.service";

export const portfolioController = (portfolioService: PortfolioService) => ({
  /* ================= 모든 포트폴리오 조회 ================= */
  getAllPortfolios: async (req: Request, res: Response) => {
    const projectId = req.projectId!;
    const portfolios = await portfolioService.getAllPortfolios(projectId);

    res.status(200).json({
      success: true,
      message: "Portfolios fetched successfully.",
      data: { portfolios },
    });
  },

  /* ================= 포트폴리오 프리셋 추천 ================= */
  getRecommendations: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const presets = await portfolioService.recommendPresets(projectId);

    res.status(200).json({
      success: true,
      message: "Portfolio presets fetched successfully.",
      data: { presets },
    });
  },

  /* ================= 포폴 프리셋으로 생성 ================= */
  createFromPreset: async (req: Request, res: Response) => {
    const projectId = req.projectId!;
    const { presetCode } = req.body;
    const portfolio = await portfolioService.createFromPreset({
      projectId,
      presetCode,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created from preset successfully.",
      data: { portfolio },
    });
  },

  /* ================= 포트폴리오 아이템 설정 ================= */
  setPortfolioItems: async (req: Request, res: Response) => {
    const projectId = req.projectId!;
    const { items } = req.body;
    const portfolio = await portfolioService.setPortfolioItems({
      projectId,
      items,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio items updated successfully.",
      data: { portfolio },
    });
  },

  /* ================= 추가 가능한 카테고리 조회 ================= */
  getAvailableCategories: async (req: Request, res: Response) => {
    const userId = req.userId!;
    const { portfolioId } = req.body;
    const categories = await portfolioService.getAvailableCategories({
      userId,
      portfolioId,
    });

    res.status(200).json({
      success: true,
      message: "Available categories fetched successfully.",
      data: { categories },
    });
  },

  /* ================= 추가 가능한 아이템 조회 ================= */
  getAvailableItems: async (req: Request, res: Response) => {
    const userId = req.userId!;
    const { portfolioId, categoryId } = req.body;
    const items = await portfolioService.getAvailableItems({
      userId,
      portfolioId,
      categoryId,
    });

    res.status(200).json({
      success: true,
      message: "Available items fetched successfully.",
      data: { items },
    });
  },
});
