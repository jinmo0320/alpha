import { Survey } from "src/application/model/survey.model";

export type SurveyService = {
  /**
   * 투자 성향 질문 리스트를 반환하는 함수
   * @errors QUESTIONS_NOT_FOUND
   * @returns 투자 성향 질문 리스트
   */
  getInvestmentQuestions: () => Promise<Survey.Res.Root[]>;
};
