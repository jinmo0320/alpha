import { Request, Response } from "express";
import { PaymentService } from "../../service/payment/payment.service";

export const paymentController = (paymentService: PaymentService) => ({
  getPayments: async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const payments = await paymentService.getPayments(userId);
    res.status(200).json({
      success: true,
      message: "Successfully fetched.",
      data: { payments },
    });
  },

  recordPayment: async (req: Request, res: Response) => {
    const { scheduleId, amount, paidAt } = req.body;
    await paymentService.recordPayment({
      scheduleId: Number(scheduleId),
      amount: Number(amount),
      paidAt,
    });
    res.status(201).json({
      success: true,
      message: "Recorded investment payment.",
    });
  },
});
