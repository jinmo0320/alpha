import db from "src/externals/database/db";
import { ProjectRepository } from "./project.repository";

export const createProjectRepository = (): ProjectRepository => ({
  createProject: async (userId, name) => {
    await db.execute(
      `INSERT INTO projects (user_id, name)
       VALUES (?, ?)`,
      [userId, name],
    );
  },
});
