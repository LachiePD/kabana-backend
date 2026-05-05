export class AccountRepository {
  constructor(dbConnection) {
    if (!dbConnection) throw new Error("invalid dbConnection");
    this.dbConnection = dbConnection;
    this.type = "accounts";
  }
  async getAll() {
    const query = `SELECT * FROM "${this.type}"`;
    return await this.dbConnection.query(query);
  }
  async getById(id) {
    const query = `SELECT * FROM "${this.type}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }

  async create(data) {
    const columns = Object.getOwnPropertyNames(data);
    const values = Object.values(data);
    const placeholders = values.map(_, (i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO ${this.type} (${columns.join(", ")})
	  VALUES (${placeholders})
	  RETURNING *`;
    return this.dbConnection.query(query, values);
  }

  async delete(id) {
    const query = `DELETE FROM "${this.type}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }
  async update(data) {}
  async getByContext(contextData, type) {}
}
