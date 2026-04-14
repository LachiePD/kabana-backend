import { describe, it, expect, vi } from "vitest";
import { createApp } from "./app.mjs";
import request from "supertest";
describe("app object", () => {
  it("returns a valid app object", () => {
    const app = createApp([]);
    expect(app).toBeDefined();
  });

  it("wires the route properly, when given an acceptable dependency", async () => {
    const mockRepo = vi.fn(() => "pong");
    const mockService = { action: "ping", repository: { ping: mockRepo } };
    const mockDep = {
      method: "GET",
      path: "/ping",
      middleware: null,
      service: mockService,
    };
    const app = createApp(mockDep);
    const data = await request(app).get("/ping");
    console.log(await data.body);
    console.log(data.status);
  });
});
