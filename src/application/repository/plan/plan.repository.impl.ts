import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "../../../externals/database/db";
import { PlanRepository } from "./plan.repository";
import { Plan } from "src/application/model/plan.model";

const nullableNumber = (value: unknown): number | null =>
  value === null ? null : Number(value);

const nullableDate = (value: unknown): Date | null =>
  value === null ? null : new Date(value as string | number | Date);

const mapPlan = (row: RowDataPacket): Plan.Entity => ({
  version: Number(row.version),
  initialAmount: Number(row.initialAmount),
  monthlyAmount: Number(row.monthlyAmount),
  period: Number(row.period),
  expectedReturn: Number(row.expectedReturn),
  targetAmount: Number(row.targetAmount),
  startDate: nullableDate(row.startDate),
  paymentDay: nullableNumber(row.paymentDay),
  createdAt: new Date(row.createdAt),
  updatedAt: new Date(row.updatedAt),
  isActive: Boolean(row.isActive),
});

export const createPlanRepository = (): PlanRepository => ({
  createPlan: async (req) => {
    const { projectId, ...mtrf } = req;

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO plans (
          initial_amount,
          monthly_amount,
          period,
          expected_return,
          target_amount
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          mtrf.initialAmount,
          mtrf.monthlyAmount,
          mtrf.period,
          mtrf.expectedReturn,
          mtrf.targetAmount,
        ],
      );

      const planId = result.insertId;
      await conn.execute(
        `INSERT INTO project_plans (project_id, plan_id, is_active)
         VALUES (?, ?, TRUE)`,
        [projectId, planId],
      );

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  getPlan: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.initial_amount AS initialAmount,
        p.monthly_amount AS monthlyAmount,
        p.start_date AS startDate,
        p.payment_day AS paymentDay,
        p.period,
        p.expected_return AS expectedReturn,
        p.target_amount AS targetAmount,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt,
        pp.version,
        pp.is_active AS isActive
       FROM plans p
       JOIN project_plans pp ON p.id = pp.plan_id
       WHERE pp.project_id = ? AND pp.is_active = TRUE
       LIMIT 1`,
      [projectId],
    );

    return rows.length > 0 ? mapPlan(rows[0]) : null;
  },
});
