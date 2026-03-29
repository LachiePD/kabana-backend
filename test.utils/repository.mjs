import { Repository } from "../repository/index.mjs";
import { vi } from "vitest";

export const repository = (overload = {}) => {
  const { db } = { db: { query: vi.fn() }, ...overload };
  const repo = new Repository(db);
  return repo;
};
