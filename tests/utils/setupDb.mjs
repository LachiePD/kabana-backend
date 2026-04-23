import { DbConnection } from "#/infrastructure/DbConnection.mjs";
import { Pool } from "pg";
const connectionString = process.env.CONNECTION_STRING;

export const setupDb = async () => {
  const pool = new Pool({ connectionString });
  const db = new DbConnection(pool);

  await db.query(`
    TRUNCATE TABLE issues RESTART IDENTITY CASCADE;
    TRUNCATE TABLE accounts RESTART IDENTITY CASCADE;
    TRUNCATE TABLE projects RESTART IDENTITY CASCADE;
  `);
};
