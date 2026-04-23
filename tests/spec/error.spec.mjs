import { describe, it, expect } from "vitest";
import { AppError } from "#/error/AppError.mjs";
describe("AppError", () => {
  it.each([undefined, "", null, 2])(
    "throws if message is invalid (%s)",
    (message) => {
      expect(() => new AppError({ message, status: 500 })).toThrow(
        "AppError: invalid message",
      );
    },
  );
  it.each([undefined, null, "two"])(
    "throws if status is invalid (%s)",
    (status) => {
      expect(() => new AppError({ message: "test", status })).toThrow(
        "AppError: invalid status",
      );
    },
  );
});
