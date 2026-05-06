import { requestHydrator } from "#/requestHydrator/index.mjs";
import { describe, it, expect } from "vitest";

describe("requestHydrator.login", () => {
  it("returns expected value if input is correct", () => {
    const data = requestHydrator.login({
      body: { name: "  Lachie  ", password: "  Password123  " },
    });

    expect(data).toEqual({
      name: "Lachie",
      password: "Password123",
    });
  });
});
