import dotenv from "dotenv";
import { dirname, resolve } from "path";
dotenv.config({ path: resolve(__dirname, "../.env") });
import Pool from "pg-pool";

const connectionString = process.env.DATABASE_URL;

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
