import { describe, it, vi, expect } from "vitest";
import { createMock } from "../utils/index.mjs";
import { Repository } from "#/repository/index.mjs";
describe("Repository class", () => {
  it("gets created when called", () => {
    const repo = createMock.repository();
    expect(repo).toBeDefined();
  });
  it("throws when no dbConnection is given", () => {
    const repo = () => createMock.repository({ db: undefined });
    expect(repo).toThrow("invalid dbConnection");
  });
  it("throws when invalid context is given", async () => {
    const db = createMock.db;
    const repo = new Repository(db);

    await expect(repo.getAllByEntity("cars")).rejects.toThrow();
  });
  it.each([
    { fn: "getAllByEntity", params: ["projects"] },
    { fn: "getByEntityId", params: ["projects", 1] },
    { fn: "createByEntity", params: ["projects", { name: "kabana" }] },
    { fn: "deleteByEntity", params: ["projects", 1] },
    {
      fn: "updateByEntity",
      params: ["projects", 1, { name: "stickyBrain" }],
    },
  ])("method $fn calls the database correctly", async ({ fn, params }) => {
    const repo = createMock.repository();
    await repo[fn](...params);

    expect(repo.dbConnection.query).toBeCalled();
  });
});
