import { describe, it, expect, vi } from "vitest";
import { resourceFactory } from "./factory.router.mjs";
import { createMock } from "#/tests/utils/index.mjs";
import { assert } from "./assert.mjs";
describe("the assertion layer of router factory", () => {
  const generateAssertedDep = (dep) => assert(dep);

  it("passes when given a valid mockDep", () => {
    const mockDep = createMock.routeDependency();
    expect(() => assert(mockDep)).not.toThrow();
  });
  it("throws error when missing service", () => {
    const mockDep = createMock.routeDependency({ service: undefined });

    expect(() => generateAssertedDep(mockDep)).toThrow("missing service");
  });
  it("throws error when missing method", () => {
    const mockDep = createMock.routeDependency({ method: undefined });
    expect(() => generateAssertedDep(mockDep)).toThrow("missing method");
  });

  it("throws error when missing path", () => {
    const mockDep = createMock.routeDependency({ path: undefined });
    expect(() => generateAssertedDep(mockDep)).toThrow("missing path");
  });
  it("throws error when missing middleware", () => {
    const mockDep = createMock.routeDependency({ middleware: undefined });
    expect(() => generateAssertedDep(mockDep)).toThrow("missing middleware");
  });
});
