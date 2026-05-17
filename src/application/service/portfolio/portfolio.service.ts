import { UUID } from "crypto";
import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";

export type PortfolioService = {
  /**
   * 포트폴리오 정보 조회
   * @param portfolioId 포트폴리오 ID
   * @errors INVALID_ITEMS
   * @returns 포트폴리오 정보 또는 null
   */
  getPortfolio: (portfolioId: number) => Promise<Portfolio.Res.Root | null>;

  /**
   * 프로젝트의 현재 포트폴리오를 조회
   * @param projectId 프로젝트 ID
   * @errors INVALID_ITEMS
   * @returns 포트폴리오 정보 또는 null
   */
  getLatestPortfolio: (projectId: number) => Promise<Portfolio.Res.Root | null>;

  /**
   * 프로젝트의 모든 포트폴리오를 조회
   * @param projectId 프로젝트 ID
   * @errors INVALID_ITEMS
   * @returns 포트폴리오 목록
   */
  getAllPortfolios: (projectId: number) => Promise<Portfolio.Res.Root[]>;

  /**
   * 추천 프리셋을 조회
   * @param projectId 프로젝트 ID
   * @errors PLAN_NOT_FOUND, INVALID_ITEMS
   * @returns 추천 프리셋 목록
   */
  recommendPresets: (projectId: number) => Promise<Portfolio.Res.Preset[]>;

  /**
   * 프리셋으로 포트폴리오를 생성
   * @param req 프로젝트 ID, 프리셋 코드
   * @errors INVALID_ITEMS
   * @returns 생성된 포트폴리오 정보
   */
  createFromPreset: (req: Portfolio.Req.Create) => Promise<Portfolio.Res.Root>;

  /**
   * 포트폴리오 아이템을 세팅
   * @param req 프로젝트 ID와 아이템 설정 정보
   * @errors INVALID_ITEMS
   * @returns 설정된 포트폴리오 정보
   */
  setPortfolioItems: (req: Portfolio.Req.Set) => Promise<Portfolio.Res.Root>;

  /**
   * 추가 가능한 카테고리를 조회
   * @param req 사용자 ID, 포트폴리오 ID
   * @returns 추가 가능한 카테고리 목록
   */
  getAvailableCategories: (
    req: Category.Req.Available,
  ) => Promise<Category.Res.Root[]>;

  /**
   * 추가 가능한 아이템을 조회
   * @param req 사용자 ID, 포트폴리오 ID, 카테고리 ID
   * @returns 추가 가능한 아이템 목록
   */
  getAvailableItems: (req: Item.Req.Available) => Promise<Item.Res.Root[]>;
};
