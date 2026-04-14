import { describe, it, vi, expect } from "vitest";
import { createMock } from "../utils/index.mjs";
import { assert, Repository } from "#/repository/index.mjs";
import { DbConnection } from "#/infrastructure/index.mjs";
describe("repo integration with the backend", () => {
  it("returns data from the db", async () => {
    const dbConnection = new DbConnection();
    const repo = new Repository(dbConnection);
    const data = await repo.getAllByEntity("projects");
    expect(data).toHaveProperty("rows");
  });
});
