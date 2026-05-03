import { Survey } from "src/application/repository/survey/entity/survey.entity";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { SurveyDeps } from "./deps";

export const createGetInvestmentQuestions =
  ({ surveyRepository }: SurveyDeps) =>
  async (): Promise<Survey.Question[]> => {
    const questions = await surveyRepository.getInvestmentQuestions();
    if (!questions) {
      throw new DomainError(
        ErrorCodes.SURVEY.QUESTIONS_NOT_FOUND,
        "Questions not found",
      );
    }

    return questions;
  };
