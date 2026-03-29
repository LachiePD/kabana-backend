import { describe, it, vi, expect } from "vitest";
import { createMock } from "../test.utils/index.mjs";
import { assert } from "./assert.mjs";

describe("integration of the repository deps", () => {
  vi.mock("./assert.mjs", () => ({
    assert: vi.fn(),
  }));
  it("intergrates the assert function", async () => {
    const mockRepo = createMock.repository();
    await mockRepo.getAllByEntity();
    expect(assert).toHaveBeenCalled();
  });
});
