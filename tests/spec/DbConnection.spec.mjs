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
  it("seeds data to the db", async () => {
    const db = new DbConnection();
    await db.connect();

    const rows = await db.seed({
      insert: {
        query: "INSERT INTO projects (project_name) VALUES ($1)",
        params: ["test"],
      },
      select: {
        query: "SELECT * FROM projects",
      },
    });

    expect(rows).toHaveLength(1);

    expect(rows[0]).toMatchObject({
      project_name: "test",
    });
  });
});
