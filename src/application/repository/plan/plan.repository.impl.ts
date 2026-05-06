import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "../../../externals/database/db";
import { PlanRepository } from "./plan.repository";

const mapPlanRow = (row: RowDataPacket) => ({
  id: Number(row.id),
  version: Number(row.version),
  initialAmount: Number(row.initialAmount),
  monthlyAmount: Number(row.monthlyAmount),
  startDate: row.startDate,
  paymentDay: Number(row.paymentDay),
  period: Number(row.period),
  expectedReturn: Number(row.expectedReturn),
  targetAmount: Number(row.targetAmount),
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  isActive: Boolean(row.isActive),
});

export const createPlanRepository = (): PlanRepository => ({
  getActivePlan: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
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

    return rows.length > 0 ? mapPlanRow(rows[0]) : null;
  },

  getAllPlans: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
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
       WHERE pp.project_id = ?
       ORDER BY pp.version DESC`,
      [projectId],
    );

    return rows.map(mapPlanRow);
  },

  createPlan: async (projectId, data) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [versionRows] = await conn.execute<RowDataPacket[]>(
        `SELECT COALESCE(MAX(version), 0) + 1 AS nextVersion
         FROM project_plans
         WHERE project_id = ?`,
        [projectId],
      );
      const nextVersion = Number(versionRows[0].nextVersion);

      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO plans (
          initial_amount,
          monthly_amount,
          start_date,
          payment_day,
          period,
          expected_return,
          target_amount
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          data.initialAmount,
          data.monthlyAmount,
          data.startDate,
          data.paymentDay,
          data.period,
          data.expectedReturn,
          data.targetAmount,
        ],
      );

      const planId = result.insertId;
      await conn.execute(
        `INSERT INTO project_plans (project_id, plan_id, version, is_active)
         VALUES (?, ?, ?, TRUE)`,
        [projectId, planId, nextVersion],
      );

      await conn.commit();
      return planId;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  updatePlan: async (planId, data) => {
    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.initialAmount !== undefined) {
      updates.push("initial_amount = ?");
      values.push(data.initialAmount);
    }
    if (data.monthlyAmount !== undefined) {
      updates.push("monthly_amount = ?");
      values.push(data.monthlyAmount);
    }
    if (data.startDate !== undefined) {
      updates.push("start_date = ?");
      values.push(data.startDate);
    }
    if (data.paymentDay !== undefined) {
      updates.push("payment_day = ?");
      values.push(data.paymentDay);
    }
    if (data.period !== undefined) {
      updates.push("period = ?");
      values.push(data.period);
    }
    if (data.expectedReturn !== undefined) {
      updates.push("expected_return = ?");
      values.push(data.expectedReturn);
    }
    if (data.targetAmount !== undefined) {
      updates.push("target_amount = ?");
      values.push(data.targetAmount);
    }

    if (updates.length > 0) {
      values.push(planId);
      await db.execute(
        `UPDATE plans SET ${updates.join(", ")} WHERE id = ?`,
        values,
      );
    }

    if (data.isActive !== undefined) {
      await db.execute(`UPDATE project_plans SET is_active = ? WHERE plan_id = ?`, [
        data.isActive,
        planId,
      ]);
    }
  },

  deactivatePlans: async (projectId) => {
    await db.execute(
      `UPDATE project_plans SET is_active = FALSE WHERE project_id = ?`,
      [projectId],
    );
  },
});
