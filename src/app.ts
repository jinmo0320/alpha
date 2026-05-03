import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger/config/swagger";

import authRoutes from "./routers/auth.router";
import userRoutes from "./routers/user.router";
import surveyRoutes from "./routers/survey.router";
import invProfileRoutes from "./routers/invProfile.router";
import portfolioRoutes from "./routers/portfolio.router";
import paymentRoutes from "./routers/payment.router";

import errorMiddleware from "./middlewares/errorMiddleware";

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
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users/me", userRoutes);
router.use("/surveys", surveyRoutes);
router.use("/users/me/investment-profile", invProfileRoutes);
router.use("/users/me/portfolio", portfolioRoutes);
router.use("/users/me/payment", paymentRoutes);

app.use("/api/v1", router);

/** error handler */
app.use(errorMiddleware);

/** server start */
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
