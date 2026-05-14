import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";

export type PortfolioRepository = {
  /**
   * 사용자 포트폴리오 전체 조회
   * @param projectId 프로젝트 ID
   * @returns 포트폴리오 리스트
   */
  getAll: (projectId: number) => Promise<Portfolio.Entity[]>;

  /**
   * 최신 버전 포트폴리오 조회
   * @param projectId 프로젝트 ID
   * @returns 포트폴리오 상세 정보
   */
  get: (projectId: number) => Promise<Portfolio.Entity | null>;

  /**
   * 포트폴리오 아이템 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 아이템 리스트 (portion & alias 포함)
   */
  getItemsInPortfolio: (
    portfolioId: number,
  ) => Promise<Portfolio.Entity.Item[]>;

  /**
   * 프리셋 조회
   * @param targetReturnPercent 목표 수익률
   * @returns 프리셋 포트폴리오 (목표 수익률과 가장 근접한 것)
   */
  getPresets(targetReturnPercent: number): Promise<Portfolio.Entity.Preset[]>;

  /**
   * 프리셋 아이템 조회
   * @param presetCode 프리셋 코드
   * @returns 아이템 리스트 (portion 포함)
   */
  getItemsInPreset: (presetCode: string) => Promise<Portfolio.Entity.Item[]>;

  /**
   * 프리셋 기반으로 새로운 포트폴리오 생성
   * @param req 프로젝트 ID, 프리셋 코드
   */
  createFromPreset: (req: Portfolio.Req.Create) => Promise<Portfolio.Entity>;

  /**
   * 포트폴리오 아이템 초기화
   * @param req 포트폴리오 ID, 아이템 목록과 각 아이템의 비중
   * @return 설정된 포트폴리오 정보
   */
  init: (req: Portfolio.Req.Set) => Promise<Portfolio.Entity>;

  /**
   * 포트폴리오에 추가 가능한 카테고리 목록 가져오기
   * @param req 사용자 ID, 포트폴리오 ID
   * @return 추가 가능한 카테고리 리스트
   */
  getAvailableCategories: (
    req: Category.Req.Available,
  ) => Promise<Category.Entity[]>;

  /**
   * 포트폴리오에 추가 가능한 아이템 목록 가져오기
   * @param req 사용자 ID, 포트폴리오 ID, 카테고리 ID
   * @return 추가 가능한 아이템 리스트
   */
  getAvailableItems: (req: Item.Req.Available) => Promise<Item.Entity[]>;
};
