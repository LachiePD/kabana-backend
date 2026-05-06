import { describe, it, expect, vi, beforeEach } from "vitest";
import { resourceFactory } from "#/routers/factory.router.mjs";
import request from "supertest";
import express from "express";

describe("resourceFactory", () => {
  let app;
  let service;
  let hydrator;
  let config;

  beforeEach(() => {
    service = { doThing: vi.fn().mockResolvedValue({ result: "ok" }) };
    hydrator = vi.fn().mockReturnValue({ name: "Lachie" });
    config = {
      method: "POST",
      path: "/test",
      middleware: [],
      service,
      action: "doThing",
      hydrator,
    };
    app = express();
    app.use(express.json());
    app.use(resourceFactory(config));
  });

  it("calls the hydrator with the request payload", async () => {
    await request(app).post("/test").send({ name: "Lachie" });
    expect(hydrator).toHaveBeenCalledWith(
      expect.objectContaining({ body: { name: "Lachie" } })
    );
  });

  it("calls the service action with the hydrated data", async () => {
    await request(app).post("/test").send({ name: "Lachie" });
    expect(service.doThing).toHaveBeenCalledWith({ name: "Lachie" });
  });

  it("responds with 200 and the service result", async () => {
    const response = await request(app).post("/test").send({ name: "Lachie" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: "ok" });
  });
});
