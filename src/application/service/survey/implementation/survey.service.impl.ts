import { SurveyDeps } from "../interface/survey.deps";
import { SurveyService } from "../interface/survey.service";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";

export const createSurveyService = ({
  surveyRepository,
}: SurveyDeps): SurveyService => ({
  getInvestmentQuestions: async () => {
    const questions = await surveyRepository.getInvestmentQuestions();

    if (!questions) {
      throw new DomainError(
        ErrorCodes.SURVEY.QUESTIONS_NOT_FOUND,
        "Questions not found",
      );
    }

    return questions.map((question) => ({
      title: question.title,
      answers: question.answers,
    }));
  },
});
