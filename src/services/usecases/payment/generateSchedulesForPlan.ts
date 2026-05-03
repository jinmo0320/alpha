import { PaymentDeps } from "src/services/implementations/payment.service.impl";
import { generateSchedules, PlanForSchedule } from "src/domain/payment/payment.logic";

type GenerateSchedulesForPlan = (
  planId: number,
  plan: PlanForSchedule,
) => Promise<void>;

export const generateSchedulesForPlan =
  ({ paymentRepository }: PaymentDeps): GenerateSchedulesForPlan =>
  async (planId, plan) => {
    const schedules = generateSchedules(planId, plan);
    await paymentRepository.createSchedules(schedules);
  };
