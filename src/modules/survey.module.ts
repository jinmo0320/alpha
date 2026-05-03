import { Router } from "express";
import { surveyController } from "src/application/presentation/controllers/survey.controller";
import { createSurveyRepository } from "src/application/repository/survey/survey.repository.impl";
import { SurveyService } from "src/application/service/survey/interface/survey.service";
import * as SurveyUsecases from "src/implementation/service/survey";

const router = Router();

const deps = {
  surveyRepository: createSurveyRepository(),
};

const service: SurveyService = {
  getInvestmentQuestions: SurveyUsecases.createGetInvestmentQuestions(deps),
};

const ctrl = surveyController(service);

router.get("/investment/questions", ctrl.getInvestmentQuestions);

export default router;
