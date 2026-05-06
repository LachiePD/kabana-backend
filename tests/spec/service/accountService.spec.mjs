import { expect, it, vi, beforeEach, describe } from "vitest";
import { AccountService } from "#/service/AccountService.mjs";
import bcrypt from "bcrypt";
let repo;
let service;

describe("AccountService", () => {
  beforeEach(() => {
    repo = {
      getAll: vi.fn(),
      create: vi.fn(),
    };

    service = new AccountService(repo);
  });

  it("creates account and returns id", async () => {
    repo.getAll.mockResolvedValue({ rows: [] });

    repo.create.mockResolvedValue({
      rows: [{ id: 1 }],
    });

    const id = await service.createAccount({
      name: "Lachie",
      password: "example123",
    });

    expect(id).toBe(1);

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Lachie",
      }),
    );
  });

  it("throws if username already exists", async () => {
    repo.getAll.mockResolvedValue({
      rows: [{ name: "Lachie" }],
    });

    await expect(
      service.createAccount({
        name: "Lachie",
        password: "example123",
      }),
    ).rejects.toMatchObject({
      message: "username taken",
      status: 400,
    });
  });

  it("detects existing user", async () => {
    repo.getAll.mockResolvedValue({
      rows: [{ name: "Lachie" }],
    });

    const exists = await service.userExists("Lachie");

    expect(exists).toBe(true);
  });

  it("returns false when user does not exist", async () => {
    repo.getAll.mockResolvedValue({
      rows: [],
    });

    const exists = await service.userExists("Lachie");

    expect(exists).toBe(false);
  });
  it("hashes password before storing account", async () => {
    repo.getAll.mockResolvedValue({ rows: [] });

    repo.create.mockResolvedValue({
      rows: [{ id: 1 }],
    });

    await service.createAccount({
      name: "Lachie",
      password: "example123",
    });

    const savedPassword = await repo.create.mock.calls[0][0].password;
    console.log(savedPassword);

    expect(savedPassword).not.toBe("example123");
    expect(savedPassword.startsWith("$2b$")).toBe(true);

    const isValid = await bcrypt.compare("example123", savedPassword);

    expect(isValid).toBe(true);
  });
});
