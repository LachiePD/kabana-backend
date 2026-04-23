import { describe, it, expect, vi, beforeEach } from "vitest";
import { DbConnection } from "#/infrastructure/DbConnection.mjs";
let mockPool;
let db;

beforeEach(() => {
  mockPool = {
    connect: vi.fn(),
    query: vi.fn(),
  };

  db = new DbConnection(mockPool);
});

describe("DbConnection", () => {
  it("connect calls pool.connect and returns true", async () => {
    mockPool.connect.mockResolvedValue();

    const result = await db.connect();

    expect(mockPool.connect).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("query forwards query and params to pool", async () => {
    mockPool.query.mockResolvedValue({ rows: [] });

    await db.query("SELECT * FROM users", [1]);

    expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users", [1]);
  });

  it("cleanup truncates projects table", async () => {
    mockPool.query.mockResolvedValue();

    await db.cleanup();

    expect(mockPool.query).toHaveBeenCalledWith(
      "TRUNCATE TABLE projects RESTART IDENTITY CASCADE",
    );
  });
});
