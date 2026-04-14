import { DbConnection } from "#/infrastructure/DbConnection.mjs";
import { describe, it, expect } from "vitest";

describe("the db connection", () => {
  it("connects to the db", async () => {
    const dbConnection = new DbConnection();

    const result = await dbConnection.connect();
    expect(result).toBe(true);
  });
});
