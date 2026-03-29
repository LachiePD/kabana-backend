import { vi } from "vitest";

export const routeDependency = (override = {}) => {
  const dep = {
    method: "GET",
    path: "/test",
    middleware: [],
    action: "test",
    service: {
      test: vi.fn(() => {
        success: true;
      }),
    },
    schema: vi.fn((input) => input),
  };
  const mockDep = { ...dep, ...override };
  return mockDep;
};
