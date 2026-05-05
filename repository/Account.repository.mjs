import { buildInsertQuery } from "./buildInsertQuery.mjs";

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
	  const placeholders = values.map(_, i => `$${i+1}`).join(', ');
	  const query = `INSERT INTO ${this.type} (${columns.join(', '})
	  VALUES (${placeholders})
	  RETURNING *`	
    return this.dbConnection.query(query, values);
  }

  async delete( id) {
    const query = `DELETE FROM "${this.type}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }
  async updateByEntity(type, entityId, data) {
    //TODO, write tests for this nonsense.
    //three params is a lot for a method, we need to think about breaking this apart
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const finalValues = [...values, entityId];
    const idPlaceholder = `$${finalValues.length}`;

    const query = `
    UPDATE ${type}
    SET ${columns}
    WHERE id = ${idPlaceholder}
    RETURNING *; 
  `;

    return await this.dbConnection.query(query, finalValues);
  }
  async getByContext(contextData, type) {}
}
