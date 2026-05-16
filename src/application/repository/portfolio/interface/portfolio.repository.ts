import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";

export type PortfolioRepository = {
  /**
   * 포트폴리오를 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 포트폴리오 정보 또는 null
   */
  get: (portfolioId: number) => Promise<Portfolio.Entity | null>;

  /**
   * 프로젝트의 포트폴리오 목록을 조회
   * @param projectId 프로젝트 ID
   * @returns 포트폴리오 목록
   */
  getAll: (projectId: number) => Promise<Portfolio.Entity[]>;

  /**
   * 최신 포트폴리오를 조회
   * @param projectId 프로젝트 ID
   * @returns 포트폴리오 정보 또는 null
   */
  getLatest: (projectId: number) => Promise<Portfolio.Entity | null>;

  /**
   * 포트폴리오 아이템을 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 포트폴리오 아이템 목록
   */
  getItemsInPortfolio: (
    portfolioId: number,
  ) => Promise<Portfolio.Entity.Item[]>;

  /**
   * 프리셋을 조회
   * @param targetReturnPercent 목표 수익률
   * @returns 프리셋 목록
   */
  getPresets(targetReturnPercent: number): Promise<Portfolio.Entity.Preset[]>;

  /**
   * 프리셋 아이템을 조회
   * @param presetCode 프리셋 코드
   * @returns 프리셋 아이템 목록
   */
  getItemsInPreset: (presetCode: string) => Promise<Portfolio.Entity.Item[]>;

  /**
   * 프리셋으로 포트폴리오를 생성
   * @param req 프로젝트 ID, 프리셋 코드
   * @returns 생성된 포트폴리오 정보
   */
  createFromPreset: (req: Portfolio.Req.Create) => Promise<Portfolio.Entity>;

  /**
   * 포트폴리오 아이템을 세팅
   * @param req 프로젝트 ID와 아이템 설정 정보
   * @returns 설정된 포트폴리오 정보
   */
  setItems: (req: Portfolio.Req.Set) => Promise<Portfolio.Entity>;

  /**
   * 추가 가능한 카테고리를 조회
   * @param req 사용자 ID, 포트폴리오 ID
   * @returns 추가 가능한 카테고리 목록
   */
  getAvailableCategories: (
    req: Category.Req.Available,
  ) => Promise<Category.Entity[]>;

  /**
   * 추가 가능한 아이템을 조회
   * @param req 사용자 ID, 포트폴리오 ID, 카테고리 ID
   * @returns 추가 가능한 아이템 목록
   */
  getAvailableItems: (req: Item.Req.Available) => Promise<Item.Entity[]>;
};
