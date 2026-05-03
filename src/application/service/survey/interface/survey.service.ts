import { Survey } from "src/application/repository/survey/entity/survey.entity";

export type SurveyService = {
  getInvestmentQuestions: () => Promise<Survey.Question[]>;
};
