import { DbConnection } from "#/infrastructure/DbConnection.mjs";
import { describe, it, expect } from "vitest";

describe("the db connection", () => {
  it("executes a query after DB initialization", async () => {
    const db = new DbConnection();

    await db.connect();

    const result = await db.query("SELECT 1 as value");

    expect(result.rows[0].value).toBe(1);
  });
});
