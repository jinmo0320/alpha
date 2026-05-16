import { Request, Response } from "express";
import { PortfolioService } from "../../service/portfolio/portfolio.service";

export const portfolioController = (portfolioService: PortfolioService) => ({
  /* ================= 포트폴리오 정보 조회 ================= */
  getPortfolio: async (req: Request, res: Response) => {
    const { portfolioId } = req.body;
    const portfolio = await portfolioService.getPortfolio(portfolioId);

    res.status(200).json({
      success: true,
      message: "추천 포트폴리오 프리셋을 가져왔습니다",
      data: { portfolio },
    });
  },

  /* ================= 모든 포트폴리오 조회 ================= */
  getAllPortfolios: async (req: Request, res: Response) => {
    const projectId = req.projectId!;
    const portfolios = await portfolioService.getAllPortfolios(projectId);

    res.status(200).json({
      success: true,
      message: "추천 포트폴리오 프리셋을 가져왔습니다",
      data: { portfolios },
    });
  },

  /* ================= 포트폴리오 프리셋 추천 ================= */
  getRecommendations: async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const presets = await portfolioService.recommendPresets(projectId);

    res.status(200).json({
      success: true,
      message: "추천 포트폴리오 프리셋을 가져왔습니다",
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

  /* ================= 포폴 아이템 생성 ================= */
  setPortfolioItems: async (req: Request, res: Response) => {
    const { portfolioId, items } = req.body;
    const portfolio = await portfolioService.setPortfolioItems({
      portfolioId,
      items,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created from preset successfully.",
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
      message: "추가 가능한 카테고리를 가져왔습니다.",
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
      message: "추가 가능한 아이템을 가져왔습니다.",
      data: { items },
    });
  },
});
