import { RowDataPacket } from "mysql2";
import db from "src/externals/database/db";
import { UserRepository } from "src/application/repository/user/user.repository";
import { User } from "src/application/model/user.model";

const userColumns = `
  id,
  email,
  name,
  tag,
  password AS hashedPassword,
  risk_type AS riskType,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

export const createUserRepository = (): UserRepository => ({
  create: async (user) => {
    await db.execute(
      "INSERT INTO users (name, tag, email, password) VALUES (?, ?, ?, ?)",
      [user.name, user.tag, user.email, user.password],
    );

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${userColumns} FROM users WHERE email = ?`,
      [user.email],
    );

    return User.Map.toEntity(rows[0]);
  },

  delete: async (userId) => {
    await db.execute("DELETE FROM users WHERE id = ?", [userId]);
  },

  findUserById: async (id) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${userColumns} FROM users WHERE id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return null;
    }

    return User.Map.toEntity(rows[0]);
  },

  findUserByEmail: async (email) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${userColumns} FROM users WHERE email = ?`,
      [email],
    );

    if (rows.length === 0) {
      return null;
    }

    return User.Map.toEntity(rows[0]);
  },

  findUserByName: async (name, tag) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${userColumns} FROM users WHERE name = ? AND tag = ?`,
      [name, tag],
    );

    if (rows.length === 0) {
      return null;
    }

    return User.Map.toEntity(rows[0]);
  },

  getUserPassword: async (id) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT id, email, password FROM users WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return null;
    }

    const { email, password } = rows[0];
    return { id, email, hashedPassword: password };
  },

  updateUserPassword: async (id, hashedPassword) => {
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      id,
    ]);
  },

  updateUserName: async ({ userId, name, tag }) => {
    await db.execute("UPDATE users SET name = ?, tag = ? WHERE id = ?", [
      name,
      tag,
      userId,
    ]);
  },

  getRiskType: async (userId) => {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT risk_type FROM users WHERE id = ?",
      [userId],
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0].risk_type as User.Entity.RiskType | null;
  },

  setRiskType: async (userId, riskType) => {
    await db.execute("UPDATE users SET risk_type = ? WHERE id = ?", [
      riskType,
      userId,
    ]);

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${userColumns} FROM users WHERE id = ?`,
      [userId],
    );

    return User.Map.toEntity(rows[0]);
  },
});
