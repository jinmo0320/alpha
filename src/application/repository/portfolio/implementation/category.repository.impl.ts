import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Category } from "src/application/model/category.model";
import db from "src/externals/database/db";
import { CategoryRepository } from "../interface/category.repository";

const mapCategory = (row: RowDataPacket): Category.Entity => ({
  id: Number(row.id),
  code: row.code,
  name: row.name,
  description: row.description ?? "",
});

const getCategoryById = async (
  categoryId: number,
): Promise<Category.Entity | null> => {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT id, code, name, description
     FROM categories
     WHERE id = ?
     LIMIT 1`,
    [categoryId],
  );

  return rows.length > 0 ? mapCategory(rows[0]) : null;
};

export const createCategoryRepository = (): CategoryRepository => {
  return {
    getAll: async (userId) => {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT 
          c.id,
          c.code,
          c.name,
          c.description
         FROM categories c
         JOIN category_ownership co ON c.id = co.category_id
         WHERE co.user_id = ?
         ORDER BY c.id ASC`,
        [userId],
      );

      return rows.map(mapCategory);
    },

    get: async (categoryId) => {
      return await getCategoryById(categoryId);
    },

    create: async (req) => {
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();

        const [result] = await conn.execute<ResultSetHeader>(
          `INSERT INTO categories (code, name, description)
           VALUES ('CUSTOM', ?, ?)`,
          [req.name, req.description ?? null],
        );

        const newCategoryId = result.insertId;

        await conn.execute(
          `INSERT INTO category_ownership (user_id, category_id)
           VALUES (?, ?)`,
          [req.userId, newCategoryId],
        );

        const category = await getCategoryById(newCategoryId);
        if (!category) throw new Error("Failed to create category");

        await conn.commit();
        return category;
      } catch (e) {
        await conn.rollback();
        throw e;
      } finally {
        conn.release();
      }
    },

    update: async (req) => {
      const updates: string[] = [];
      const values: any[] = [];

      if (req.name !== undefined) {
        updates.push("name = ?");
        values.push(req.name);
      }
      if (req.description !== undefined) {
        updates.push("description = ?");
        values.push(req.description);
      }

      if (updates.length > 0) {
        values.push(req.categoryId);
        await db.execute(
          `UPDATE categories SET ${updates.join(", ")} WHERE id = ?`,
          values,
        );
      }

      const category = await getCategoryById(req.categoryId);
      if (!category) throw new Error("Category not found");

      return category;
    },

    delete: async (categoryId) => {
      await db.execute(`DELETE FROM categories WHERE id = ?`, [categoryId]);
    },
  };
};
