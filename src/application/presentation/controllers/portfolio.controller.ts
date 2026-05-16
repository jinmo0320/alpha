import { Request, Response } from "express";
import { PortfolioService } from "../../service/portfolio/portfolio.service";

export const portfolioController = (portfolioService: PortfolioService) => ({
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
    const projectId = Number(req.params.projectId);
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

  initPortfolio

  // === 자산군 ===
  getCategories: async (req: Request, res: Response) => {
    const categories = await portfolioService.getCategories(
      req.user!.portfolioId!,
    );
    res.status(200).json({
      success: true,
      message: "카테고리를 가져왔습니다",
      data: { categories },
    });
  },

  updateCategoryPortions: async (req: Request, res: Response) => {
    await portfolioService.updateCategoryPortions({
      portfolioId: req.user!.portfolioId!,
      portions: req.body.categoryPortions,
    });
    res
      .status(200)
      .json({ success: true, message: "Asset Categories updated." });
  },

  deleteCategory: async (req: Request, res: Response) => {
    await portfolioService.deleteCategory({
      portfolioId: req.user!.portfolioId!,
      categoryId: Number(req.params.categoryId),
    });
    res.status(200).json({ success: true, message: "Asset Category deleted." });
  },

  getAvailableCategories: async (req: Request, res: Response) => {
    const categories = await portfolioService.getAvailableCategories(
      req.user!.portfolioId!,
    );
    res.status(200).json({
      success: true,
      message: "추가 가능한 카테고리를 가져왔습니다.",
      data: { categories },
    });
  },

  // === 자산군 내 하위 자산 ===
  getItemsRelative: async (req: Request, res: Response) => {
    const items = await portfolioService.getItemsRelative({
      portfolioId: req.user!.portfolioId!,
      categoryId: Number(req.params.categoryId),
    });
    res.status(200).json({
      success: true,
      message: "상대 비중으로 아이템을 가져왔습니다.",
      data: { items },
    });
  },

  updateItemRelativePortions: async (req: Request, res: Response) => {
    await portfolioService.updateItemRelativePortions({
      portfolioId: req.user!.portfolioId!,
      categoryId: Number(req.params.categoryId),
      portions: req.body.itemPortions,
    });
    res
      .status(200)
      .json({ success: true, message: "Relative portions updated." });
  },

  getAvailableItems: async (req: Request, res: Response) => {
    const list = await portfolioService.getAvailableItems({
      portfolioId: req.user!.portfolioId!,
      categoryId: Number(req.params.categoryId),
    });
    res.status(200).json({
      success: true,
      message: "추가 가능한 아이템을 가져왔습니다.",
      data: { list },
    });
  },

  // === 개별 하위 자산 ===
  getItemsAbsolute: async (req: Request, res: Response) => {
    const items = await portfolioService.getItemsAbsolute(
      req.user!.portfolioId!,
    );
    res.status(200).json({
      success: true,
      message: "절대 비중으로 아이템을 가져왔습니다.",
      data: { items },
    });
  },

  updateItemAbsolutePortions: async (req: Request, res: Response) => {
    await portfolioService.updateItemAbsolutePortions({
      portfolioId: req.user!.portfolioId!,
      portions: req.body.itemPortions,
    });
    res
      .status(200)
      .json({ success: true, message: "Absolute portions updated." });
  },

  deleteItem: async (req: Request, res: Response) => {
    await portfolioService.deleteItem({
      portfolioId: req.user!.portfolioId!,
      itemId: Number(req.params.itemId),
    });
    res.status(200).json({ success: true, message: "Asset Item deleted." });
  },
});
