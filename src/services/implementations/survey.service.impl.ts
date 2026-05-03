import { SurveyRepository } from "src/repositories/interfaces/survey.repository";
import { Survey } from "src/domain/survey/survey.entity";
import { DomainError } from "src/errors/error";
import { ErrorCodes } from "src/errors/errorCodes";
import { SurveyService } from "src/services/interfaces/survey.service";

export const createSurveyService = ({
  surveyRepository,
}: {
  surveyRepository: SurveyRepository;
}): SurveyService => ({
  getInvestmentQuestions: async (): Promise<Survey.Question[]> => {
    const questions = await surveyRepository.getInvestmentQuestions();
    if (!questions) {
      throw new DomainError(
        ErrorCodes.SURVEY.QUESTIONS_NOT_FOUND,
        "Questions not found",
      );
    }

    return questions;
  },
});
