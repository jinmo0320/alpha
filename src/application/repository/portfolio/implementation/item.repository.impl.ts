import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Item } from "src/application/model/item.model";
import db from "src/externals/database/db";
import { ItemRepository } from "../interface/item.repository";

const getItemById = async (itemId: number): Promise<Item.Entity | null> => {
  const [rows] = await db.execute<RowDataPacket[]>(
    `SELECT
      id,
      category_id AS categoryId,
      name,
      description,
      min_return AS minReturn,
      max_return AS maxReturn
     FROM items
     WHERE id = ?
     LIMIT 1`,
    [itemId],
  );

  return rows.length > 0 ? Item.Map.toEntity(rows[0]) : null;
};

export const createItemRepository = (): ItemRepository => {
  return {
    getAll: async (userId) => {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT
          i.id,
          i.category_id AS categoryId,
          i.name,
          i.description,
          i.min_return AS minReturn,
          i.max_return AS maxReturn
         FROM items i
         JOIN item_ownership io ON i.id = io.item_id
         WHERE io.user_id = ?
         ORDER BY i.id ASC`,
        [userId],
      );

      return rows.map(Item.Map.toEntity);
    },

    create: async (req) => {
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();

        const [itemResult] = await conn.execute<ResultSetHeader>(
          `INSERT INTO items (category_id, name, description, min_return, max_return)
           VALUES (?, ?, ?, ?, ?)`,
          [
            req.categoryId,
            req.name,
            req.description ?? null,
            req.minReturn,
            req.maxReturn,
          ],
        );

        const newItemId = itemResult.insertId;

        await conn.execute(
          `INSERT INTO item_ownership (user_id, item_id)
           VALUES (?, ?)`,
          [req.userId, newItemId],
        );

        const item = await getItemById(newItemId);
        if (!item) throw new Error("Item not found");

        await conn.commit();
        return item;
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
      if (req.minReturn !== undefined) {
        updates.push("min_return = ?");
        values.push(req.minReturn);
      }
      if (req.maxReturn !== undefined) {
        updates.push("max_return = ?");
        values.push(req.maxReturn);
      }
      if (req.categoryId !== undefined) {
        updates.push("category_id = ?");
        values.push(req.categoryId);
      }

      if (updates.length > 0) {
        values.push(req.itemId);
        await db.execute(
          `UPDATE items SET ${updates.join(", ")} WHERE id = ?`,
          values,
        );
      }

      const item = await getItemById(req.itemId);
      if (!item) throw new Error("Item not found");

      return item;
    },

    delete: async (itemId) => {
      await db.execute(`DELETE FROM items WHERE id = ?`, [itemId]);
    },
  };
};
