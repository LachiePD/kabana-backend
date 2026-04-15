import { describe, it, vi, expect } from "vitest";
import { error } from "#/middleware/index.mjs";
import request from "supertest";
import express from "express";
describe("the error handling middleware", () => {
  it("throws error when given a res object with errors", async () => {
    const app = express();
    app.get("/errorTest", (req, res) => {
      throw { code: 500, message: "Error talking to backend" };
    });
    app.use(error);

    const response = await request(app).get("/errorTest");
    expect(response.status).toBe(500);
    expect(response.body.message).toEqual("Error talking to backend");
  });
  it("returned error code is relative", async () => {
    const app = express();
    app.get("/test", (req, res) => {
      throw { code: 401, message: "test" };
    });

    app.use(error);
    const response = await request(app).get("/test");
    expect(response.status).toBe(401);
  });
});
