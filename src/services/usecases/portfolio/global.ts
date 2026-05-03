import { UUID } from "crypto";
import { PortfolioDeps } from "src/services/implementations/portfolio.service.impl";
import { Portfolio } from "src/domain/portfolio/portfolio.entity";
import { CreateFromPresetReqDto } from "src/services/dtos/portfolio.dto";

/**
 * 유저의 포트폴리오 전체 데이터 조회
 * @param userId user id
 */
type GetPortfolioUsecase = (userId: UUID) => Promise<Portfolio.Root | null>;

export const createGetPortfolio =
  ({ portfolioRepository }: PortfolioDeps): GetPortfolioUsecase =>
  async (userId) =>
    await portfolioRepository.getPortfolioByUserId(userId);

/**
 * 유저의 투자 계획(목표 수익률)에 기반한 추천 프리셋 리스트 조회
 * @param userId user id
 */
type GetRecommendationsUsecase = (userId: UUID) => Promise<Portfolio.Preset[]>;

export const createGetRecommendations =
  ({
    invPlanRepository,
    portfolioRepository,
  }: PortfolioDeps): GetRecommendationsUsecase =>
  async (userId) => {
    const { expectedReturn = 0 } =
      (await invPlanRepository.getActivePlan(userId as unknown as number)) ??
      {};
    return await portfolioRepository.findPresetsByReturn(expectedReturn * 100);
  };

/**
 * 프리셋 코드를 기반으로 유저의 포트폴리오 초기 생성/복제
 * @param userId user id
 * @param presetCode 프리셋 식별 코드
 */
type CreateFromPresetUsecase = ({
  userId,
  presetCode,
}: CreateFromPresetReqDto) => Promise<void>;

export const createCreateFromPreset =
  ({ portfolioRepository }: PortfolioDeps): CreateFromPresetUsecase =>
  async ({ userId, presetCode }) =>
    await portfolioRepository.createPortfolioFromPreset(userId, presetCode);
