import { expect, beforeEach, describe, it, vi } from "vitest";
import { AuthService } from "#/service/AuthService.mjs";
import bcrypt from "bcrypt";
let auth;
let repo;
describe("authService", () => {
  beforeEach(() => {
    repo = {
      findByName: vi.fn(),
    };
    auth = new AuthService(repo);
  });
  it("returns a JWT with successful login attempt", async () => {
    const hashedPassword = await bcrypt.hash("CorrectPass123", 10);
    repo.findByName.mockResolvedValue({
      name: "Winston",
      password: hashedPassword,
    });
    const account = { name: "Winston", password: "CorrectPass123" };
    const token = await auth.login(account);
    expect(token.split(".")).toHaveLength(3);
  });
  it("throws when theres no account with the name", async () => {
    repo.findByName.mockResolvedValue(null);
    const account = { name: "none", password: "CorrectPass123" };
    await expect(auth.login(account)).rejects.toThrow();
  });
});
