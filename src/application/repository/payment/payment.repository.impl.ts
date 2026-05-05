import { RowDataPacket } from "mysql2/promise";
import db from "../../../externals/database/db";
import { PaymentRepository } from "./payment.repository";
import { PaymentSchedule } from "./payment.entity";

export const createPaymentRepository = (): PaymentRepository => ({
  getSchedules: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM payment_schedules WHERE project_id = ? ORDER BY sequence ASC`,
      [projectId],
    );

    return rows.map((row) => ({
      id: Number(row.id),
      projectId: Number(row.project_id),
      sequence: Number(row.sequence),
      expectedDate: row.expected_date,
      amount: Number(row.expected_amount),
      status: row.status,
      actualPaidAmount:
        row.actual_paid_amount !== null
          ? Number(row.actual_paid_amount)
          : undefined,
      actualPaidDate: row.actual_paid_date,
    })) as PaymentSchedule[];
  },

  createSchedules: async (schedules) => {
    if (schedules.length === 0) return;
    const values = schedules.map((s) => [
      s.sequence,
      s.expectedDate,
      s.amount,
      s.status || "PENDING",
      s.projectId,
    ]);
    await db.query(
      `INSERT INTO payment_schedules (sequence, expected_date, expected_amount, status, project_id) VALUES ?`,
      [values],
    );
  },

  updateSchedulePaid: async (scheduleId, amount, paidAt) => {
    await db.execute(
      `UPDATE payment_schedules 
       SET status = 'PAID', actual_paid_amount = ?, actual_paid_date = ?
       WHERE id = ?`,
      [amount, paidAt, scheduleId],
    );
  },

  getAllPaidSchedules: async (userId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ps.* FROM payment_schedules ps
       JOIN projects p ON ps.project_id = p.id
       WHERE p.user_id = ? AND ps.status = 'PAID'`,
      [userId],
    );

    return rows.map((row) => ({
      id: Number(row.id),
      projectId: Number(row.project_id),
      sequence: Number(row.sequence),
      expectedDate: row.expected_date,
      amount: Number(row.expected_amount),
      status: row.status,
      actualPaidAmount:
        row.actual_paid_amount !== null
          ? Number(row.actual_paid_amount)
          : undefined,
      actualPaidDate: row.actual_paid_date,
    })) as PaymentSchedule[];
  },
});
