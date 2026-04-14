import { describe, it, vi, expect } from "vitest";
import { requestHydrator } from "#/requestHydrator/requestHydrator.mjs";
import { createPayload } from "../utils/index.mjs";
describe("the requestHydrator", () => {
  it("will parse valid data into a unified domain bundle", () => {
    const mockPayload = createPayload();
    const result = requestHydrator(mockPayload);

    expect(result).toEqual({
      domainId: 1,
      contextId: 2,
      filter: { status: "open" },
      data: { name: "Lachlan" },
    });
  });
  it.each([
    {
      override: { params: { domainId: 1, contextId: "two" } },
      expectedMessage: "invalid contextId",
    },
    {
      override: { params: { domainId: "one", contextId: 2 } },
      expectedMessage: "invalid domainId",
    },
    { override: { body: "hi there" }, expectedMessage: "invalid body" },
    { override: { query: "hi there" }, expectedMessage: "invalid query" },
  ])(
    "should throw $expectedMessage when given invalid payload",
    ({ override, expectedMessage }) => {
      const mockPayload = createPayload(override);
      expect(() => requestHydrator(mockPayload)).toThrow(expectedMessage);
    },
  );
});
