import { assert } from "./assert.mjs";
export class Repository {
  a;
  //TODO think about the params of all the methods, most of them only should have 'entity' and 'entityId
  constructor(dbConnection) {
    if (!dbConnection) throw new Error("invalid dbConnection");
    this.dbConnection = dbConnection;
  }
  async getAllByEntity(entity) {
    assert(entity);
    const query = `SELECT * FROM "${entity}"`;
    return await this.dbConnection.query(query);
  }
  async getByEntity(type, id) {
    assert(entity);
    const query = `SELECT * FROM "${entity}" WHERE id = $1`;
    return await this.dbConnection.query(query, [id]);
  }

  async createByEntity(entity, data) {
    assert(entity);
    const columns = Object.keys(data)
      .map((col) => `"${col}"`)
      .join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
    INSERT INTO "${entity}" (${columns})
    VALUES (${placeholders})
    RETURNING *;
  `;

    return await this.dbConnection.query(query, values);
  }
  async deleteEntity(entity, entityId) {
    assert(entity);
    const query = `DELETE FROM "${entity}" WHERE id = $1`;
    return await this.dbConnection.query(query, [entityId]);
  }
  async updateByEntity(entity, entityId, data) {
    //TODO, write tests for this nonsense.
    //three params is a lot for a method, we need to think about breaking this apart
    assert(entity);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const finalValues = [...values, entityId];
    const idPlaceholder = `$${finalValues.length}`;

    const query = `
    UPDATE ${entity}
    SET ${columns}
    WHERE id = ${idPlaceholder}
    RETURNING *; 
  `;

    return await this.dbConnection.query(query, finalValues);
  }
  async getByContext(contextData, entity) {}
}
