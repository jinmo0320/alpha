import { UUID } from "crypto";
import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio, Preset } from "src/application/model/portfolio.model";

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
<<<<<<< HEAD
   * 포트폴리오 아이템 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 아이템 리스트
   */
  getItemsInPortfolio: (
    portfolioId: number,
  ) => Promise<Portfolio.Entity.Item[]>;

  /**
   * 포트폴리오에 포함된 카테고리 조회
   * @param portfolioId 포트폴리오 ID
   */
  getCategoriesInPortfolio: (
    portfolioId: number,
  ) => Promise<
    (Category.Entity & {
      portion: number;
      minReturn: number;
      maxReturn: number;
    })[]
  >;

  /**
=======
>>>>>>> parent of 129b1f1 (add getItemsInPortfolio)
   * 프리셋 조회
   * @param targetReturnPercent 목표 수익률
   * @returns 프리셋 포트폴리오 (목표 수익률과 가장 근접한 것)
   */
  getPreset(targetReturnPercent: number): Promise<Preset.Entity[]>;

  /**
   * 프리셋에 포함된 아이템 조회
   * @param presetCode 프리셋 코드
   */
  getItemsInPreset: (
    presetCode: string,
  ) => Promise<(Item.Entity & { portion: number })[]>;

  /**
   * 프리셋에 포함된 카테고리 조회
   * @param presetCode 프리셋 코드
   */
  getCategoriesInPreset: (
    presetCode: string,
  ) => Promise<
    (Category.Entity & {
      portion: number;
      minReturn: number;
      maxReturn: number;
    })[]
  >;

  /**
   * 프리셋 기반으로 새로운 포트폴리오 생성
   * @param req 프로젝트 ID, 프리셋 코드
   */
  createFromPreset: (req: Portfolio.Req.Create) => Promise<Portfolio.Entity>;

  /**
   * 포트폴리오 아이템 설정
   * @param req 포트폴리오 ID, 아이템 목록과 각 아이템의 비중
   * @returns
   */
  set: (req: Portfolio.Req.Set) => Promise<Portfolio.Entity>;

  /**
   * 포트폴리오에 추가 가능한 카테고리 목록 가져오기
   * @param portfolioId 포트폴리오 ID
   */
  getAvailableCategories: (portfolioId: number) => Promise<Category.Entity[]>;

  /**
   * 포트폴리오에 추가 가능한 아이템 목록 가져오기
   * @param userId 사용자 ID
   * @param portfolioId 포트폴리오 ID
   */
  getAvailableItems: (req: Item.Req.Available) => Promise<Item.Entity[]>;
};
