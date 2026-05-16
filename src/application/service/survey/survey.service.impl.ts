import { SurveyDeps } from "./survey.deps";
import { SurveyService } from "./survey.service";
import { DomainError } from "src/application/errors/error";
import { ErrorCodes } from "src/application/errors/errorCodes";
import { Survey } from "src/application/model/survey.model";

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

    return questions.map(
      (question): Survey.Res.Root => ({
        title: question.title,
        answers: question.answers,
      }),
    );
  },
});
