import { UUID } from "crypto";
import { PaymentSchedule } from "src/application/model/payment.model";

export type PaymentRepository = {
  getSchedules: (projectId: number) => Promise<PaymentSchedule[]>;
  createSchedules: (schedules: Partial<PaymentSchedule>[]) => Promise<void>;
  updateSchedulePaid: (
    scheduleId: number,
    amount: number,
    paidAt: Date,
  ) => Promise<void>;

  getAllPaidSchedules: (userId: UUID) => Promise<PaymentSchedule[]>;
};
