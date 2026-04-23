import { requestHydrator } from "#/requestHydrator/index.mjs";
import { describe, it, expect } from "vitest";

describe("requestHydrator.createAccount", () => {
  it("throws 400 if missing account name", () => {
    expect(() => requestHydrator.createAccount()).toThrowError(
      "missing account name",
    );
  });

  it("throws 400 if account name is not a string", () => {
    expect(() =>
      requestHydrator.createAccount({ name: 123, password: "Password123" }),
    ).toThrowError("invalid account name type");
  });

  it("throws 400 if account name is empty string", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "   ", password: "Password123" }),
    ).toThrowError("missing account name");
  });
  it("throws 400 if missing password", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie" }),
    ).toThrowError("missing password");
  });

  it("throws 400 if password is not a string", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie", password: 123 }),
    ).toThrowError("invalid password type");
  });

  it("throws 400 if password is empty string", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie", password: "   " }),
    ).toThrowError("missing password");
  });

  it("throws 400 if password is too short", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie", password: "Abc12" }),
    ).toThrowError("password too short (min 8 characters)");
  });

  it("throws 400 if password has no letters", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie", password: "12345678" }),
    ).toThrowError("password must contain a letter");
  });

  it("throws 400 if password has no numbers", () => {
    expect(() =>
      requestHydrator.createAccount({ name: "Lachie", password: "Password" }),
    ).toThrowError("password must contain a number");
  });
  it("returns expected value if input is correct", () => {
    const data = requestHydrator.createAccount({
      name: "  Lachie  ",
      password: "Password123",
    });

    expect(data).toEqual({
      name: "Lachie",
      password: "Password123",
    });
  });
});
