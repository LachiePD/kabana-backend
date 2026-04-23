import { assert } from "./assert.mjs";
import { buildInsertQuery } from "./buildInsertQuery.mjs";

export class Repository {
  constructor(dbConnection) {
    if (!dbConnection) throw new Error("invalid dbConnection");
    this.dbConnection = dbConnection;
  }
  async getAllByType(type) {
    assert(type);
    const query = `SELECT * FROM "${type}"`;
    return await this.dbConnection.query(query);
  }
  async getByEntity(type, id) {
    assert(type);
    const query = `SELECT * FROM "${type}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }

  async createByEntity(type, data) {
    assert(type);
    const { query, values } = buildInsertQuery(type, data);
    return this.dbConnection.query(query, values);
  }

  async deleteEntity(type, id) {
    assert(type);
    const query = `DELETE FROM "${type}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }
  async updateByEntity(type, entityId, data) {
    //TODO, write tests for this nonsense.
    //three params is a lot for a method, we need to think about breaking this apart
    assert(type);
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
