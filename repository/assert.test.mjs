import { describe, it, expect } from "vitest";
describe("assertion of the entity value", () => {
  it("doesnt throw when given an expected entity", () => {
    const mockEntity = "project";
    expect(() => assert(mockEntity).not.toThrow());
  });
  it("throws when given an invalid entity", () => {
    const mockEntity = { maliciousPayload: "give me ur moneys" };
    expect(() => assert(mockEntity).toThrow("invalid entity"));
  });
});
