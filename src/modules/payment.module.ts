import { Router } from "express";
import { authenticate } from "../application/presentation/middlewares/authenticate";
import { paymentController } from "../application/presentation/controllers/payment.controller";
import { createPaymentRepository } from "../application/repository/payment/payment.repository.impl";
import { createPaymentService } from "../application/service/payment/payment.service.impl";

const router = Router();

const service = createPaymentService({
  paymentRepository: createPaymentRepository(),
});

const ctrl = paymentController(service);

// Detailed progress/schedule generation is paused until the payment model is rebuilt.
router.get("/", authenticate, ctrl.getPayments);
router.post("/", authenticate, ctrl.recordPayment);

export default router;
