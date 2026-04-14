import { createErrMiddleware } from "../utils/index.mjs";
import { describe, it, vi, expect } from "vitest";
describe("the error handling middleware", () => {
  it("throws error when given a res object with errors", () => {
    const errResponse = createErrMiddleware();
    expect(errResponse.res.status).toHaveBeenCalledWith(500);
  });
});
