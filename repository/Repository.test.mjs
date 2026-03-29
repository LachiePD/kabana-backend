import { describe, it, vi, expect } from "vitest";
import { createMock } from "../test.utils/index.mjs";
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
    { fn: "getAllByEntity", params: ["project"] },
    { fn: "getByEntityId", params: ["project", 1] },
    { fn: "createByEntity", params: ["project", { name: "kabana" }] },
    { fn: "deleteByEntity", params: ["project", 1] },
    {
      fn: "updateByEntity",
      params: ["project", 1, { name: "stickyBrain" }],
    },
    //{ fn: "getByContext", params: [{ entity: "project", id: 1 }, "developer"] },
  ])("method $fn calls the database correctly", async ({ fn, params }) => {
    console.log("need to implement getByContext functionality");
    const repo = createMock.repository();
    await repo[fn](...params);

    expect(repo.dbConnection.query).toBeCalled();
  });
});
