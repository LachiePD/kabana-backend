class DbConnection {
  constructor({ Pool, connectionString }) {
    this.pool = new Pool({ connectionString: connectionString });
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
export { DbConnection };
