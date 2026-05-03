import { Router } from "express";
import { surveyController } from "../controllers/survey.controller";
import { createSurveyService } from "src/services/implementations/survey.service.impl";
import { createSurveyRepository } from "src/repositories/implementations/survey.repository.impl";

const router = Router();

const ctrl = surveyController(
  createSurveyService({
    surveyRepository: createSurveyRepository(),
  }),
);

router.get("/investment/questions", ctrl.getInvestmentQuestions);

export default router;
