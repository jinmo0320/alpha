import { PaymentDeps } from "src/implementation/service/payment/deps";
import { generateSchedules, PlanForSchedule } from "src/implementation/service/payment/logic/payment.logic";

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
