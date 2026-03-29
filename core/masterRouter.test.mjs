import { describe, it, expect, vi } from "vitest";
import { masterRouter } from "./masterRouter.mjs";
import { Router } from "express";
vi.mock("express", () => {
  const createMockRouter = () => ({
    use: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  });

  return {
    Router: vi.fn(() => createMockRouter()),
  };
});
describe("masterRouter", () => {
  it("creates the master router", () => {
    const mockArr = [
      {
        service: {
          findAll: (a) => a + 1,
        },
        path: "/test",
        middleware: null,
        method: "GET",
      },
      {
        service: () => {},
        path: "/test2",
        middleware: null,
        method: "POST",
      },
    ];

    const master = masterRouter(mockArr);

    expect(master.use).toHaveBeenCalledTimes(2);
  });
});
