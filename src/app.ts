import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger/config/swagger";

import authRoutes from "./modules/auth.module";
import userRoutes from "./modules/user.module";
import surveyRoutes from "./modules/survey.module";
import planRoutes from "./modules/plan.module";
import portfolioRoutes from "./modules/portfolio.module";
import projectRoutes from "./modules/project.module";

import errorMiddleware from "./application/presentation/middlewares/errorMiddleware";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json()); // json 포맷을 해독하기 위해 사용하는 미들웨어
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded 포맷을 해독하기 위해 사용하는 미들웨어

/** health check api */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/** swagger document */
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true, // 검색창 활성화 여부
  }),
);

/** api */
const router = express.Router({ mergeParams: true });
router.use("/auth", authRoutes);
router.use("/users/me", userRoutes);
router.use("/surveys", surveyRoutes);
router.use("/projects/:projectId/plan", planRoutes);
router.use("/projects/:projectId/portfolio", portfolioRoutes);
router.use("/projects", projectRoutes);

app.use("/api/v1", router);

/** error handler */
app.use(errorMiddleware);

/** server start */
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
