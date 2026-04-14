import { vi, expect, describe, it } from "vitest";
import { resourceFactory } from "#/routers/factory.router.mjs";
import { createMock } from "../utils/index.mjs";
import request from "supertest";
import express from "express";
describe(" router factory", () => {
  it("creates a resource router", async () => {
    const mockDep = createMock.routeDependency();
    const router = resourceFactory(mockDep);
    expect(router).toBeDefined();
  });
  it("responds with a 200 status code", async () => {
    const mockDep = createMock.routeDependency();
    const router = resourceFactory(mockDep);
    const app = createMock.app(router);
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
  });

  it("invokes service when /test is hit", async () => {
    const app = express();
    const mockService = { test: vi.fn() };
    const dep = createMock.routeDependency({
      action: "test",
      service: mockService,
    });
    const router = resourceFactory(dep);
    app.use(router);
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(mockService.test).toHaveBeenCalledTimes(1);
  });

  it("uses middleware", async () => {
    const mockMiddleware = vi.fn((req, res, next) => {
      next();
    });
    const dep = createMock.routeDependency({ middleware: [mockMiddleware] });
    const router = await resourceFactory(dep);
    const app = createMock.app(router);
    await request(app).get("/test");
    expect(mockMiddleware).toHaveBeenCalled();
  });
});
