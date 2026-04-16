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

  async query(query) {
    const data = await this.pool.query(query);
    return data;
  }
}
