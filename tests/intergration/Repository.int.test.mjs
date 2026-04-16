import { describe, it, vi, expect } from "vitest";
import { createMock } from "../utils/index.mjs";
import { assert, Repository } from "#/repository/index.mjs";
import { DbConnection } from "#/infrastructure/index.mjs";
describe("repo integration with the backend", () => {
  it("returns data from the db", async () => {
    const db = new DbConnection();

    await db.query("INSERT into projects (project_name) VALUES ($1)", [
      "testProject",
    ]);
    const repo = new Repository(db);
    const data = await repo.getAllByEntity("projects");
    expect(data.rows[1].project_name).toEqual("testProject");
    await db.cleanup();
  });
});
