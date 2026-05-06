import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "#/app.mjs";
import { setupDb } from "../utils/setupDb.mjs";

describe("user logs in", () => {
  let app;
  beforeEach(async () => {
    app = createApp();
    await setupDb();
    await request(app)
      .post("/accounts")
      .send({ name: "Lachie", password: "example123" });
  });
  it("returns a cookie setting response", async () => {
    const account = { name: "Lachie", password: "example123" };
    const response = await request(app).post("/login").send(account);
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });
  it("returns 401 when the password is wrong", async () => {
    const account = { name: "Lachie", password: "wrongpassword" };
    const response = await request(app).post("/login").send(account);
    expect(response.status).toBe(401);
  });
  it("returns 404 when the account does not exist", async () => {
    const account = { name: "nobody", password: "example123" };
    const response = await request(app).post("/login").send(account);
    expect(response.status).toBe(404);
  });
});
