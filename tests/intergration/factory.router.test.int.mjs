import { vi, expect, describe, it } from "vitest";
import { resourceFactory } from "#/routers/factory.router.mjs";
import { createMock } from "../utils/index.mjs";
import request from "supertest";
import express from "express";

describe("rejects invalid router configuration", () => {
  it("intergrates the assertion function: throws error if routerDep doesnt assert", () => {
    const mockDep = {
      method: "GET",
      path: "/ping",
      middleware: null,
    };
    expect(() => resourceFactory(mockDep)).toThrow("missing service");
  });
});
