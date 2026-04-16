import { DbConnection } from "#/infrastructure/DbConnection.mjs";
import { describe, it, expect } from "vitest";

describe("the db connection", () => {
  it("executes a query after DB initialization", async () => {
    const db = new DbConnection();

    await db.connect();

    const result = await db.query("SELECT 1 as value");

    expect(result.rows[0].value).toBe(1);
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
