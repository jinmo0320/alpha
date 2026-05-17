import { Router } from "express";
import { surveyController } from "src/application/presentation/controllers/survey.controller";
import { createSurveyRepository } from "src/application/repository/survey/survey.repository.impl";
import { createSurveyService } from "src/application/service/survey/survey.service.impl";
import { SurveyDeps } from "src/application/service/survey/survey.deps";
import { SurveyService } from "src/application/service/survey/survey.service";

const router = Router();

const deps: SurveyDeps = {
  surveyRepository: createSurveyRepository(),
};
const service: SurveyService = createSurveyService(deps);
const ctrl = surveyController(service);

router.get("/investment/questions", ctrl.getInvestmentQuestions);

export default router;
