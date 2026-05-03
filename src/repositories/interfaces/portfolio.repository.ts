import { UUID } from "crypto";
import { Portfolio, ExpectedReturn } from "src/domain/portfolio/portfolio.entity";

export type PortfolioRepository = {
  /**
   * 사용자 포트폴리오 전체 조회
   * @param userId 사용자 ID
   * @returns 포트폴리오 리스트
  */
  getAllPortfolios: (userId: UUID) => Promise<Portfolio.Root[]>;
  getPortfolioByUserId: (userId: UUID) => Promise<Portfolio.Root | null>;

  /**
   * 포트폴리오 상세 조회
   * @param userId 사용자 ID
   * @param portfolioId 포트폴리오 ID
   * @returns 포트폴리오 상세 정보
   */
  getPortfolio: (
    userId: UUID,
    portfolioId: number,
  ) => Promise<Portfolio.Root | null>;

  /**
   * 프리셋 포트폴리오 조회
   * @param targetReturnPercent 목표 수익률
   * @returns 프리셋 포트폴리오 (목표 수익률과 가장 근접한 것)
  */
  getPreset(targetReturnPercent: number): Promise<Portfolio.Preset[] | null>;
  findPresetsByReturn: (
    targetReturnPercent: number,
  ) => Promise<Portfolio.Preset[]>;

  /**
   * 프리셋 기반으로 새로운 포트폴리오 생성
   * @param userId 사용자 ID
   * @param presetCode 프리셋 코드
   */
  createPortfolioFromPreset: (
    userId: UUID,
    presetCode: string,
  ) => Promise<void>;

  /**
   * 프리셋 정보 수정
   * @param portfolioId 포트폴리오 ID
   * @param info 포트폴리오 정보 (이름, 설명)
   */
  updatePortfolioInfo: (
    portfolioId: number,
    info: { name?: string; description?: string },
  ) => Promise<void>;

  /**
   * 포트폴리오 내 카테고리 목록 조회
   * @param portfolioId
   * @returns 카테고리 목록
   */
  getCategories: (portfolioId: number) => Promise<Portfolio.Category[]>;

  /**
   * 포트폴리오 내 자산군 비중 업데이트
   * @param portfolioId 포트폴리오 ID
   * @param portions 카테고리 ID와 비중 리스트 (합계는 100%여야 함)
   */
  updateCategoryPortions: (
    portfolioId: number,
    portions: { id?: number; categoryId?: number; portion: number }[],
  ) => Promise<void>;

  addCategory: (
    portfolioId: number,
    masterCategoryId?: number,
    customInfo?: { name?: string; description?: string },
  ) => Promise<void>;

  updateCategoryInfo: (
    categoryId: number,
    info?: { name?: string; description?: string },
  ) => Promise<void>;

  /**
   * 포트폴리오 내 카테고리 삭제
   * @param portfolioId 포트폴리오 ID
   * @param categoryId 카테고리 ID
   */
  deleteCategory: (portfolioId: number, categoryId: number) => Promise<void>;

  /**
   * 포트폴리오 내 아이템 목록 조회
   * @param portfolioId 포트폴리오 ID
   * @returns 아이템 목록
   */
  getItems: (portfolioId: number) => Promise<Portfolio.Item[]>;

  /**
   * 포트폴리오 내 카테고리별 아이템 목록 조회
   * @param portfolioId 포트폴리오 ID
   * @param categoryId 카테고리 ID
   * @returns 아이템 목록
   */
  getItemsByCategory: (
    categoryId: number,
    portfolioId?: number,
  ) => Promise<Portfolio.Item[]>;

  /**
   * 포트폴리오에 새로운 아이템 추가
   * @param portfolioId 대상 포트폴리오 ID
   * @param itemId 추가할 아이템의 마스터 ID
   * @param portion 할당할 절대 비중 (0.0 ~ 1.0)
   * @param customInfo (선택) 사용자가 직접 지정할 이름과 설명
   */
  addItem: (
    categoryId: number,
    itemId?: number,
    customInfo?: { name?: string; description?: string },
  ) => Promise<void>;

  /**
   * 포트폴리오 내 아이템 비중 업데이트 (절대 비중 방식)
   * @param portfolioId 포트폴리오 ID
   * @param portions 아이템 ID와 비중 리스트 (합계는 100%여야 함)
   * @returns
   */
  updateItemAbsolutePortions: (
    portfolioId: number,
    portions: { id?: number; itemId?: number; portion: number }[],
  ) => Promise<void>;

  /**
   * 포트폴리오 내 아이템 비중 업데이트 (상대 비중 방식)
   * @param portfolioId 포트폴리오 ID
   * @param categoryId 카테고리 ID
   * @param portions 아이템 ID와 비중 리스트 (합계는 100%여야 함)
   */
  updateItemRelativePortions: (
    categoryId: number,
    portions: { id?: number; itemId?: number; portion: number }[],
    portfolioId?: number,
  ) => Promise<void>;

  /**
   * 포트폴리오 내 아이템 정보 업데이트
   * @param portfolioId 포트폴리오 ID
   * @param itemId 아이템 ID
   * @param itemInfo 아이템 정보 (이름, 설명)
   */
  updateItemInfo: (
    itemId: number,
    itemInfo: {
      name?: string;
      description?: string;
    },
    portfolioId?: number,
  ) => Promise<void>;

  /**
   * 포트폴리오 내 아이템 삭제
   * @param portfolioId 포트폴리오 ID
   * @param itemId 아이템 ID
   */
  deleteItem: (portfolioId: number, itemId: number) => Promise<void>;

  /**
   * 포트폴리오에 추가 가능한 카테고리 목록 가져오기
   * @param userId 사용자 ID
   * @param portfolioId 포트폴리오 ID
   */
  getAvailableCategories: (
    portfolioId: number,
    userId?: number,
  ) => Promise<Portfolio.AvailableCategory[]>;

  /**
   * 포트폴리오에 추가 가능한 아이템 목록 가져오기
   * @param userId 사용자 ID
   * @param portfolioId 포트폴리오 ID
   */
  getAvailableItems: (
    categoryId: number,
    userId?: number,
  ) => Promise<Portfolio.AvailableItem[]>;
};
