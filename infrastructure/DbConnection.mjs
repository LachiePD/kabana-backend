export class DbConnection {
  constructor(pool) {
    this.pool = pool;
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
