import { describe, it, vi, expect } from "vitest";
import { createMock } from "../utils/index.mjs";
describe("Repository class", () => {
  it("gets created when called", () => {
    const repo = createMock.repository();
    expect(repo).toBeDefined();
  });
  it("throws when no dbConnection is given", () => {
    const repo = () => createMock.repository({ db: undefined });
    expect(repo).toThrow("invalid dbConnection");
  });
  it("calls the assert function", () => {
    const repo = createMock.repository();
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
    //{ fn: "getByContext", params: [{ entity: "projects", id: 1 }, "developer"] },
  ])("method $fn calls the database correctly", async ({ fn, params }) => {
    console.log("need to implement getByContext functionality");
    const repo = createMock.repository();
    await repo[fn](...params);

    expect(repo.dbConnection.query).toBeCalled();
  });
});
