import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Category } from "src/application/model/category.model";
import { Item } from "src/application/model/item.model";
import { Portfolio } from "src/application/model/portfolio.model";
import db from "src/externals/database/db";
import { PortfolioRepository } from "../interface/portfolio.repository";

type Executor = Pick<PoolConnection, "execute">;

const mapPortfolio = (row: RowDataPacket): Portfolio.Entity => ({
  id: Number(row.id),
  name: row.name,
  status: row.status,
  minReturn: Number(row.minReturn),
  maxReturn: Number(row.maxReturn),
  createdAt: new Date(row.createdAt),
  updatedAt: new Date(row.updatedAt),
});

const mapPreset = (row: RowDataPacket): Portfolio.Entity.Preset => ({
  code: row.code,
  name: row.name,
  description: row.description ?? "",
  targetReturnPercent: Number(row.targetReturnPercent),
  minReturn: Number(row.minReturn),
  maxReturn: Number(row.maxReturn),
});

const mapCategory = (row: RowDataPacket): Category.Entity => ({
  id: Number(row.id),
  code: row.code,
  name: row.name,
  description: row.description ?? "",
});

const mapItem = (row: RowDataPacket): Item.Entity => ({
  id: Number(row.id),
  categoryId: Number(row.categoryId),
  name: row.name,
  description: row.description ?? "",
  minReturn: Number(row.minReturn),
  maxReturn: Number(row.maxReturn),
});

const mapPortfolioItem = (row: RowDataPacket): Portfolio.Entity.Item => ({
  id: Number(row.id),
  categoryId: Number(row.categoryId),
  name: row.name,
  description: row.description ?? "",
  minReturn: Number(row.minReturn),
  maxReturn: Number(row.maxReturn),
  portion: Number(row.portion ?? 0),
  alias: row.alias,
  aliasDescription: row.aliasDescription ?? "",
});

const getPortfolioById = async (
  executor: Executor,
  portfolioId: number,
): Promise<Portfolio.Entity | null> => {
  const [rows] = await executor.execute<RowDataPacket[]>(
    `SELECT
      id,
      name,
      status,
      min_return AS minReturn,
      max_return AS maxReturn,
      created_at AS createdAt,
      updated_at AS updatedAt
     FROM portfolios
     WHERE id = ?
     LIMIT 1`,
    [portfolioId],
  );

  return rows.length > 0 ? mapPortfolio(rows[0]) : null;
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
  getAll: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
        p.name,
        p.status,
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

    return rows.map(mapPortfolio);
  },

  get: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        p.id,
        p.name,
        p.status,
        p.min_return AS minReturn,
        p.max_return AS maxReturn,
        p.created_at AS createdAt,
        p.updated_at AS updatedAt
       FROM portfolios p
       JOIN project_portfolios pp ON pp.portfolio_id = p.id
       WHERE pp.project_id = ? AND pp.is_active = TRUE
       ORDER BY pp.version DESC
       LIMIT 1`,
      [projectId],
    );

    return rows.length > 0 ? mapPortfolio(rows[0]) : null;
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
        COALESCE(ia.alias, i.name) AS alias,
        COALESCE(ia.alias_description, i.description) AS aliasDescription
       FROM item_allocation ia
       JOIN items i ON i.id = ia.item_id
       WHERE ia.portfolio_id = ?
       ORDER BY ia.category_id ASC, ia.item_id ASC`,
      [portfolioId],
    );

    return rows.map(mapPortfolioItem);
  },

  getPreset: async (targetReturnPercent) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        code,
        name,
        description,
        target_return_percent AS targetReturnPercent,
        min_return AS minReturn,
        max_return AS maxReturn
       FROM portfolio_presets
       ORDER BY ABS(target_return_percent - ?) ASC, target_return_percent ASC`,
      [targetReturnPercent],
    );

    return rows.map(mapPreset);
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
        pia.portion,
        i.name AS alias,
        i.description AS aliasDescription
       FROM preset_item_allocation pia
       JOIN portfolio_presets pp ON pp.id = pia.preset_id
       JOIN items i ON i.id = pia.item_id
       WHERE pp.code = ?
       ORDER BY pia.category_id ASC, pia.item_id ASC`,
      [presetCode],
    );

    return rows.map(mapPortfolioItem);
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
        `INSERT INTO portfolios (name, status, min_return, max_return)
         VALUES (?, 'PENDING', ?, ?)`,
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
        `UPDATE project_portfolios
         SET is_active = FALSE
         WHERE project_id = ?`,
        [req.projectId],
      );

      await conn.execute(
        `INSERT INTO project_portfolios (
          project_id,
          portfolio_id,
          version,
          is_active
        ) VALUES (?, ?, ?, TRUE)`,
        [req.projectId, portfolioId, nextVersion],
      );
      // 프리셋 아이템 할당을 포트폴리오 아이템 할당으로 복사
      await conn.execute(
        `INSERT INTO item_allocation (
          portfolio_id,
          item_id,
          category_id,
          alias,
          alias_description,
          portion
        )
         SELECT
          ?,
          pia.item_id,
          pia.category_id,
          i.name,
          i.description,
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

  set: async (req) => {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      await conn.execute(
        `DELETE FROM item_allocation
         WHERE portfolio_id = ?`,
        [req.portfolioId],
      );

      for (const item of req.items) {
        const [items] = await conn.execute<RowDataPacket[]>(
          `SELECT id, category_id, name, description
           FROM items
           WHERE id = ?
           LIMIT 1`,
          [item.itemId],
        );
        if (items.length === 0) throw new Error("Item not found");

        const masterItem = items[0];
        await conn.execute(
          `INSERT INTO item_allocation (
            portfolio_id,
            item_id,
            category_id,
            alias,
            alias_description,
            portion
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            req.portfolioId,
            item.itemId,
            masterItem.category_id,
            item.alias ?? masterItem.name,
            item.aliasDescription ?? masterItem.description,
            item.portion,
          ],
        );
      }

      await recalculatePortfolioReturn(conn, req.portfolioId);

      const portfolio = await getPortfolioById(conn, req.portfolioId);
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

  getAvailableCategories: async (portfolioId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id, code, name, description
       FROM categories c
       WHERE NOT EXISTS (
         SELECT 1
         FROM item_allocation ia
         WHERE ia.portfolio_id = ? AND ia.category_id = c.id
       )
       ORDER BY id ASC`,
      [portfolioId],
    );

    return rows.map(mapCategory);
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
       ORDER BY i.id ASC`,
      [req.categoryId, req.portfolioId],
    );

    return rows.map(mapItem);
  },
});
