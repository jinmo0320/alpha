import { Survey } from "src/domain/survey/survey.entity";

export type SurveyService = {
  getInvestmentQuestions: () => Promise<Survey.Question[]>;
};
