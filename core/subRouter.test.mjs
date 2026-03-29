import { describe, it, expect } from "vitest";
import { subRouter } from "./subRouter.mjs";
describe("subRouter", () => {
  it("creates a router package with a path and an Express router", () => {
    const mockObj = {
      service: {
        findAll: (a) => a + 1,
      },
      path: "/test",
      middleware: null,
      method: "GET",
    };

    const result = subRouter(mockObj);
    expect(result.path).toEqual("/test");

    expect(typeof result.router.get).toBe("function");
    expect(typeof result.router.post).toBe("function");
    expect(typeof result.router.use).toBe("function");
  });
});
