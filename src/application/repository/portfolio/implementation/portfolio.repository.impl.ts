import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";
import db from "src/externals/database/db";
import { PortfolioRepository } from "../interface/portfolio.repository";

type Executor = Pick<PoolConnection, "execute">;

const getPortfolioById = async (
  executor: Executor,
  portfolioId: number,
): Promise<Portfolio.Entity | null> => {
  const [rows] = await executor.execute<RowDataPacket[]>(
    `SELECT
      id,
      name,
      min_return AS minReturn,
      max_return AS maxReturn,
      created_at AS createdAt,
      updated_at AS updatedAt
     FROM portfolios
     WHERE id = ?
     LIMIT 1`,
    [portfolioId],
  );

  return rows.length > 0 ? Portfolio.Map.toEntity(rows[0]) : null;
};

const recalculatePortfolioReturn = async (
  executor: Executor,
  portfolioId: number,
): Promise<void> => {
  await executor.execute(
    `UPDATE portfolios
     SET
       min_return = (
         SELECT COALESCE(SUM(ia.portion * i.min_return), 0)
         FROM item_allocation ia
         JOIN items i ON i.id = ia.item_id
         WHERE ia.portfolio_id = ?
       ),
       max_return = (
         SELECT COALESCE(SUM(ia.portion * i.max_return), 0)
         FROM item_allocation ia
         JOIN items i ON i.id = ia.item_id
         WHERE ia.portfolio_id = ?
       )
     WHERE id = ?`,
    [portfolioId, portfolioId, portfolioId],
  );
};

export const createPortfolioRepository = (): PortfolioRepository => ({
  get: async (portfolioId) => {
    return await getPortfolioById(db, portfolioId);
  },

  getAll: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
        p.name,
        p.min_return AS minReturn,
        p.max_return AS maxReturn,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt
       FROM portfolios p
       JOIN project_portfolios pp ON pp.portfolio_id = p.id
       WHERE pp.project_id = ?
       ORDER BY pp.version DESC`,
      [projectId],
    );

    return rows.map(Portfolio.Map.toEntity);
  },

  getLatest: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
        p.name,
        p.min_return AS minReturn,
        p.max_return AS maxReturn,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt
       FROM portfolios p
       JOIN project_portfolios pp ON pp.portfolio_id = p.id
       WHERE pp.project_id = ?
       ORDER BY pp.version DESC
       LIMIT 1`,
      [projectId],
    );

    return rows.length > 0 ? Portfolio.Map.toEntity(rows[0]) : null;
  },

  getItemsInPortfolio: async (portfolioId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        i.id,
        ia.category_id AS categoryId,
        i.name,
        i.description,
        i.min_return AS minReturn,
        i.max_return AS maxReturn,
        ia.portion,
        ia.alias,
        ia.alias_description AS aliasDescription
       FROM item_allocation ia
       JOIN items i ON i.id = ia.item_id
       WHERE ia.portfolio_id = ?
       ORDER BY ia.category_id ASC, ia.item_id ASC`,
      [portfolioId],
    );

    return rows.map(Portfolio.Map.toItemEntity);
  },

  getPresets: async (targetReturnPercent) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        code,
        name,
        description,
        target_return_percent AS targetReturnPercent,
        min_return AS minReturn,
        max_return AS maxReturn
       FROM portfolio_presets
       ORDER BY ABS(target_return_percent - ?) ASC, target_return_percent ASC
       LIMIT 3`,
      [targetReturnPercent],
    );

    return rows.map(Portfolio.Map.toPresetEntity);
  },

  getItemsInPreset: async (presetCode) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        i.id,
        pia.category_id AS categoryId,
        i.name,
        i.description,
        i.min_return AS minReturn,
        i.max_return AS maxReturn,
        pia.portion
       FROM preset_item_allocation pia
       JOIN portfolio_presets pp ON pp.id = pia.preset_id
       JOIN items i ON i.id = pia.item_id
       WHERE pp.code = ?
       ORDER BY pia.category_id ASC, pia.item_id ASC`,
      [presetCode],
    );

    return rows.map(Portfolio.Map.toItemEntity);
  },

  createFromPreset: async (req) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 프리셋 가져오기
      const [presets] = await conn.execute<RowDataPacket[]>(
        `SELECT id, name, min_return, max_return
         FROM portfolio_presets
         WHERE code = ?
         LIMIT 1`,
        [req.presetCode],
      );
      if (presets.length === 0) throw new Error("Preset not found");

      // 포트폴리오 생성
      const preset = presets[0];
      const [portfolioResult] = await conn.execute<ResultSetHeader>(
        `INSERT INTO portfolios (name, min_return, max_return)
         VALUES (?, ?, ?)`,
        [preset.name, preset.min_return, preset.max_return],
      );
      const portfolioId = portfolioResult.insertId;

      // 프로젝트-포트폴리오 연결
      const [[versionRow]] = await conn.execute<RowDataPacket[]>(
        `SELECT COALESCE(MAX(version), 0) + 1 AS nextVersion
         FROM project_portfolios
         WHERE project_id = ?`,
        [req.projectId],
      );
      const nextVersion = Number(versionRow.nextVersion);

      await conn.execute(
        `INSERT INTO project_portfolios (
          project_id,
          portfolio_id,
          version
        ) VALUES (?, ?, ?)`,
        [req.projectId, portfolioId, nextVersion],
      );

      // 프리셋 아이템 할당을 포트폴리오 아이템 할당으로 복사
      await conn.execute(
        `INSERT INTO item_allocation (
          portfolio_id,
          item_id,
          category_id,
          portion
        )
         SELECT
          ?,
          pia.item_id,
          pia.category_id,
          pia.portion
         FROM preset_item_allocation pia
         JOIN items i ON i.id = pia.item_id
         WHERE pia.preset_id = ?`,
        [portfolioId, preset.id],
      );

      const portfolio = await getPortfolioById(conn, portfolioId);
      if (!portfolio) throw new Error("Failed to create portfolio");

      await conn.commit();
      return portfolio;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  setItems: async (req) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      // 기존 포트폴리오 정보 조회
      const [currentRows] = await conn.execute<RowDataPacket[]>(
        `SELECT
          p.name,
          pp.project_id AS projectId
         FROM portfolios p
         JOIN project_portfolios pp ON pp.portfolio_id = p.id
         WHERE p.id = ?
         LIMIT 1`,
        [req.portfolioId],
      );
      if (currentRows.length === 0) throw new Error("Portfolio not found");

      const currentPortfolio = currentRows[0];

      // 새로운 포트폴리오 생성
      const [portfolioResult] = await conn.execute<ResultSetHeader>(
        `INSERT INTO portfolios (name, min_return, max_return)
         VALUES (?, 0, 0)`,
        [currentPortfolio.name],
      );
      const portfolioId = portfolioResult.insertId;

      // 포트폴리오 버전 업데이트
      const [[versionRow]] = await conn.execute<RowDataPacket[]>(
        `SELECT COALESCE(MAX(version), 0) + 1 AS nextVersion
         FROM project_portfolios
         WHERE project_id = ?`,
        [currentPortfolio.projectId],
      );
      const nextVersion = Number(versionRow.nextVersion);

      // 새 포트폴리오를 프로젝트에 연결
      await conn.execute(
        `INSERT INTO project_portfolios (
          project_id,
          portfolio_id,
          version
        ) VALUES (?, ?, ?)`,
        [currentPortfolio.projectId, portfolioId, nextVersion],
      );

      // 포트폴리오에 아이템 할당
      for (const item of req.items) {
        await conn.execute(
          `INSERT INTO item_allocation (
            portfolio_id,
            item_id,
            category_id,
            portion,
            alias,
            alias_description
          )
          SELECT
            ?,
            id,
            category_id,
            ?,
            ?,
            ?
          FROM items
          WHERE id = ?`,
          [
            portfolioId,
            item.portion,
            item.alias ?? null,
            item.aliasDescription ?? null,
            item.itemId,
          ],
        );
      }

      await recalculatePortfolioReturn(conn, portfolioId);
      const portfolio = await getPortfolioById(conn, portfolioId);
      if (!portfolio) throw new Error("Portfolio not found");

      await conn.commit();
      return portfolio;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  getAvailableCategories: async (req) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, code, name, description
       FROM categories c
       WHERE NOT EXISTS (
         SELECT 1
         FROM item_allocation ia
         WHERE ia.portfolio_id = ? AND ia.category_id = c.id
       )
       AND (
         NOT EXISTS (
           SELECT 1
           FROM category_ownership co
           WHERE co.category_id = c.id
         )
         OR EXISTS (
           SELECT 1
           FROM category_ownership co
           WHERE co.user_id = ?
         )
       )
       ORDER BY id ASC`,
      [req.portfolioId, req.userId],
    );

    return rows.map(Category.Map.toEntity);
  },

  getAvailableItems: async (req) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        i.id,
        i.category_id AS categoryId,
        i.name,
        i.description,
        i.min_return AS minReturn,
        i.max_return AS maxReturn
       FROM items i
       WHERE i.category_id = ?
         AND NOT EXISTS (
           SELECT 1
           FROM item_allocation ia
           WHERE ia.portfolio_id = ? AND ia.item_id = i.id
         )
         AND (
           NOT EXISTS (
             SELECT 1
             FROM item_ownership io
             WHERE io.item_id = i.id
           )
           OR EXISTS (
             SELECT 1
             FROM item_ownership io
             WHERE io.user_id = ?
           )
         )
       ORDER BY i.id ASC`,
      [req.categoryId, req.portfolioId, req.userId],
    );

    return rows.map(Item.Map.toEntity);
  },
});
