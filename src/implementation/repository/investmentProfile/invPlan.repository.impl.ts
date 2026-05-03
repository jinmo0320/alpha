import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "src/database/db";
import { InvPlanRepository } from "src/application/repository/investmentProfile/interface/invPlan.repository";

export const createInvPlanRepository = (): InvPlanRepository => {
  return {
    getActivePlan: async (portfolioId) => {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT 
          ip.id,
          ip.initial_amount as initialAmount,
          ip.monthly_amount as monthlyAmount,
          ip.start_date as startDate,
          ip.payment_day as paymentDay,
          ip.period,
          ip.expected_return as expectedReturn,
          ip.target_amount as targetAmount,
          ip.created_at as createdAt,
          pa.version,
          pa.is_active as isActive
         FROM investment_plans ip
         JOIN plan_assignment pa ON ip.id = pa.plan_id
         WHERE pa.portfolio_id = ? AND pa.is_active = TRUE
         LIMIT 1`,
        [portfolioId],
      );

      if (rows.length === 0) return null;

      const r = rows[0];
      return {
        id: r.id,
        version: r.version,
        initialAmount: Number(r.initialAmount),
        monthlyAmount: Number(r.monthlyAmount),
        startDate: r.startDate,
        paymentDay: Number(r.paymentDay),
        period: Number(r.period),
        expectedReturn: Number(r.expectedReturn),
        targetAmount: Number(r.targetAmount),
        createdAt: r.createdAt,
        isActive: Boolean(r.isActive),
      };
    },

    getAllPlans: async (portfolioId) => {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT 
          ip.id,
          ip.initial_amount as initialAmount,
          ip.monthly_amount as monthlyAmount,
          ip.start_date as startDate,
          ip.payment_day as paymentDay,
          ip.period,
          ip.expected_return as expectedReturn,
          ip.target_amount as targetAmount,
          ip.created_at as createdAt,
          pa.version,
          pa.is_active as isActive
         FROM investment_plans ip
         JOIN plan_assignment pa ON ip.id = pa.plan_id
         WHERE pa.portfolio_id = ?
         ORDER BY pa.version DESC`,
        [portfolioId],
      );

      return rows.map((r) => ({
        id: r.id,
        version: r.version,
        initialAmount: Number(r.initialAmount),
        monthlyAmount: Number(r.monthlyAmount),
        startDate: r.startDate,
        paymentDay: Number(r.paymentDay),
        period: Number(r.period),
        expectedReturn: Number(r.expectedReturn),
        targetAmount: Number(r.targetAmount),
        createdAt: r.createdAt,
        isActive: Boolean(r.isActive),
      }));
    },

    createPlan: async (portfolioId, data) => {
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();

        // 1. 현재 포트폴리오의 가장 높은 버전을 가져와 새 버전 계산
        const [versionRows] = await conn.execute<RowDataPacket[]>(
          `SELECT COALESCE(MAX(version), 0) + 1 as nextVersion 
           FROM plan_assignment 
           WHERE portfolio_id = ?`,
          [portfolioId],
        );
        const nextVersion = versionRows[0].nextVersion;

        // 2. investment_plans 테이블에 정보 삽입
        const [result] = await conn.execute<ResultSetHeader>(
          `INSERT INTO investment_plans 
           (initial_amount, monthly_amount, period, expected_return, target_amount)
           VALUES (?, ?, ?, ?, ?)`,
          [
            data.initialAmount,
            data.monthlyAmount,
            data.period,
            data.expectedReturn,
            data.targetAmount,
          ],
        );

        const newPlanId = result.insertId;

        // 3. plan_assignment 테이블에 매핑 정보 삽입
        await conn.execute(
          `INSERT INTO plan_assignment (portfolio_id, plan_id, version, is_active)
           VALUES (?, ?, ?, TRUE)`,
          [portfolioId, newPlanId, nextVersion],
        );

        await conn.commit();
        return newPlanId;
      } catch (e) {
        await conn.rollback();
        throw e;
      } finally {
        conn.release();
      }
    },

    updatePlan: async (planId, data) => {
      const updates: string[] = [];
      const values: any[] = [];

      // 전달받은 값들만 동적으로 쿼리 조립
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
      if (data.isActive !== undefined) {
        updates.push("is_active = ?");
        values.push(data.isActive);
      }

      if (updates.length === 0) return;

      values.push(planId);
      await db.execute(
        `UPDATE investment_plans SET ${updates.join(", ")} WHERE id = ?`,
        values,
      );
    },

    deactivatePlans: async (portfolioId) => {
      await db.execute(
        `UPDATE plan_assignment SET is_active = FALSE WHERE portfolio_id = ?`,
        [portfolioId],
      );
    },
  };
};
