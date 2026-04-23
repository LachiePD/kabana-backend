import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "#/app.mjs";
import { setupDb } from "../utils/setupDb.mjs";
describe("user creates account", () => {
  beforeEach(async () => {
    await setupDb();
  });
  it("returns positive with an id", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/accounts")
      .send({ name: "Lachie", password: "example123" });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(expect.any(Number));
  });

  it("throws 400 if no name was sent", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/accounts")
      .send({ password: "example123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("missing account name");
  });

  it("throws 400 if user already exists", async () => {
    const app = createApp();
    const name = "lachie";

    await request(app).post("/accounts").send({ name, password: "example123" });

    const response = await request(app)
      .post("/accounts")
      .send({ name, password: "example123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("username taken");
  });
});
