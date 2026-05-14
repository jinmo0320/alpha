import { Survey } from "src/application/model/survey.model";

export type SurveyRepository = {
  /**
   * 투자 성향 질문을 조회
   * @returns 투자 성향 질문 목록
   */
  getInvestmentQuestions: () => Promise<Survey.Entity[]>;
};
