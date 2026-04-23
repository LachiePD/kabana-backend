import { expect, it, vi, beforeEach, describe } from "vitest";
import { AccountService } from "#/service/AccountService.mjs";

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
    expect(repo.createByEntity).toHaveBeenCalledWith("accounts", {
      name: "Lachie",
      password: "example123",
    });
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
});
