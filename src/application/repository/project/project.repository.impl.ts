import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "src/externals/database/db";
import { Project } from "src/application/model/project.model";
import { ProjectRepository } from "./project.repository";

export const createProjectRepository = (): ProjectRepository => ({
  create: async (req) => {
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO projects (user_id, name)
       VALUES (?, ?)`,
      [req.userId, req.name],
    );

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        id,
        name,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
       FROM projects
       WHERE id = ?
       LIMIT 1`,
      [result.insertId],
    );
    const project = rows.length > 0 ? Project.Map.toEntity(rows[0]) : null;
    if (!project) throw new Error("Failed to create project");

    return project;
  },

  getAll: async (userId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        id,
        name,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
       FROM projects
       WHERE user_id = ?
       ORDER BY created_at DESC, id DESC`,
      [userId],
    );

    return rows.map(Project.Map.toEntity);
  },

  get: async (projectId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        id,
        name,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
       FROM projects
       WHERE id = ?
       LIMIT 1`,
      [projectId],
    );

    return rows.length > 0 ? Project.Map.toEntity(rows[0]) : null;
  },
});
