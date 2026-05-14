import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "../../../externals/database/db";
import { PlanRepository } from "./plan.repository";
import { Plan } from "src/application/model/plan.model";

export const createPlanRepository = (): PlanRepository => ({
  create: async (req) => {
    const { projectId, ...mtrf } = req;

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // 새로운 플랜 생성
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

      // 버전 관리
      const [[versionRow]] = await conn.execute<RowDataPacket[]>(
        `SELECT COALESCE(MAX(version), 0) + 1 AS nextVersion
         FROM project_plans
         WHERE project_id = ?`,
        [projectId],
      );
      const nextVersion = Number(versionRow.nextVersion);

      // 프로젝트에 새 플랜 연결
      await conn.execute(
        `INSERT INTO project_plans (project_id, plan_id, version)
         VALUES (?, ?, ?)`,
        [projectId, planId, nextVersion],
      );

      // 생성된 플랜 조회
      const [[plan]] = await db.execute<RowDataPacket[]>(
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
          pp.version
         FROM plans p
         JOIN project_plans pp ON p.id = pp.plan_id
         WHERE p.id = ?
         ORDER BY pp.version DESC
         LIMIT 1`,
        [planId],
      );
      if (!plan) throw new Error("Failed to create plan");

      await conn.commit();
      return Plan.Map.toEntity(plan);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  get: async (projectId) => {
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
        pp.version
       FROM plans p
       JOIN project_plans pp ON p.id = pp.plan_id
       WHERE pp.project_id = ?
       ORDER BY pp.version DESC
       LIMIT 1`,
      [projectId],
    );

    return rows.length > 0 ? Plan.Map.toEntity(rows[0]) : null;
  },
});
