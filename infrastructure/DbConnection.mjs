import { Pool } from "pg";
const connectionString = process.env.CONNECTION_STRING;

export class DbConnection {
  constructor() {
    this.pool = new Pool({ connectionString });
  }

  async connect() {
    await this.pool.connect();
    return true;
  }

  async query(query, params) {
    const data = await this.pool.query(query, params);
    return data;
  }

  async cleanup() {
    await this.pool.query("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
  }
}
