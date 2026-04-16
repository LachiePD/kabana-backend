import { DbConnection } from "#/infrastructure/DbConnection.mjs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("db connection", () => {
  let db;

  beforeEach(async () => {
    db = new DbConnection();
    await db.connect();
    await db.query("BEGIN");
  });

  afterEach(async () => {
    await db.query("ROLLBACK");
  });

  it("executes a query after DB initialization", async () => {
    const db = new DbConnection();
    await db.connect();
    const result = await db.query("SELECT 1 as value");
    expect(result.rows[0].value).toBe(1);
  });
  it("cleans up the projects table", async () => {
    await db.query("INSERT INTO projects (project_name) VALUES ($1)", [
      "testProject",
    ]);

    await db.cleanup();

    const result = await db.query("SELECT * FROM projects");

    expect(result.rows.length).toBe(0);
  });
});
