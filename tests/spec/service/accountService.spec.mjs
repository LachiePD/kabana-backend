import { expect, it, vi, beforeEach, describe } from "vitest";
import { AccountService } from "#/service/AccountService.mjs";
import bcrypt from "bcrypt";
let repo;
let service;

describe("AccountService", () => {
  beforeEach(() => {
    repo = {
      getAllByType: vi.fn(),
      createByEntity: vi.fn(),
    };

    service = new AccountService(repo);
  });

  it("creates account and returns id", async () => {
    repo.getAllByType.mockResolvedValue({ rows: [] });

    repo.createByEntity.mockResolvedValue({
      rows: [{ id: 1 }],
    });

    const id = await service.createAccount({
      name: "Lachie",
      password: "example123",
    });

    expect(id).toBe(1);

    expect(repo.createByEntity).toHaveBeenCalledWith(
      "accounts",
      expect.objectContaining({
        name: "Lachie",
      }),
    );
  });

  it("throws if username already exists", async () => {
    repo.getAllByType.mockResolvedValue({
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
    repo.getAllByType.mockResolvedValue({
      rows: [{ name: "Lachie" }],
    });

    const exists = await service.userExists("Lachie");

    expect(exists).toBe(true);
  });

  it("returns false when user does not exist", async () => {
    repo.getAllByType.mockResolvedValue({
      rows: [],
    });

    const exists = await service.userExists("Lachie");

    expect(exists).toBe(false);
  });
  it("hashes password before storing account", async () => {
    repo.getAllByType.mockResolvedValue({ rows: [] });

    repo.createByEntity.mockResolvedValue({
      rows: [{ id: 1 }],
    });

    await service.createAccount({
      name: "Lachie",
      password: "example123",
    });

    const savedPassword = await repo.createByEntity.mock.calls[0][1].password;
    console.log(savedPassword);

    expect(savedPassword).not.toBe("example123");
    expect(savedPassword.startsWith("$2b$")).toBe(true);

    const isValid = await bcrypt.compare("example123", savedPassword);

    expect(isValid).toBe(true);
  });

  describe("authentication between front and backend", () => {
    beforeEach(() => {
      repo = {
        getAllByType: vi.fn(),
        createByEntity: vi.fn(),
        findByName: vi.fn(),
      };

      service = new AccountService(repo);
    });

    it("throws if given password does not match stored password", async () => {
      const account = { name: "Winston", password: "WrongPassword" };
      repo.findByName.mockResolvedValue({ name: "Winston", password: "1" });
      await expect(service.isPasswordCorrect(account)).rejects.toThrow(
        "Passwords dont match",
      );
    });
    it("throws if account name doesnt exist", async () => {
      const account = { name: "test", password: "newPass123" };
      repo.getAllByType.mockResolvedValue({ rows: [] });
      await expect(service.login(account)).rejects.toThrow(
        "Invalid credentials",
      );
    });
  });
});
