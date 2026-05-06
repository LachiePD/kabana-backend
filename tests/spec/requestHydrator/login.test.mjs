import { requestHydrator } from "#/requestHydrator/index.mjs";
import { describe, it, expect } from "vitest";

describe("requestHydrator.login", () => {
  it("throws 400 if missing account name", () => {
    expect(() => requestHydrator.login({ body: {} })).toThrowError("missing account name");
  });

  it("throws 400 if account name is not a string", () => {
    expect(() =>
      requestHydrator.login({ body: { name: 123, password: "Password123" } }),
    ).toThrowError("invalid account name type");
  });

  it("throws 400 if account name is empty string", () => {
    expect(() =>
      requestHydrator.login({ body: { name: "   ", password: "Password123" } }),
    ).toThrowError("missing account name");
  });

  it("throws 400 if missing password", () => {
    expect(() => requestHydrator.login({ body: { name: "Lachie" } })).toThrowError(
      "missing password",
    );
  });

  it("throws 400 if password is not a string", () => {
    expect(() =>
      requestHydrator.login({ body: { name: "Lachie", password: 123 } }),
    ).toThrowError("invalid password type");
  });

  it("throws 400 if password is empty string", () => {
    expect(() =>
      requestHydrator.login({ body: { name: "Lachie", password: "   " } }),
    ).toThrowError("missing password");
  });

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
