import { error } from "#/middleware/index.mjs";
import { vi } from "vitest";
export const errMiddleware = (override = {}) => {
  const defaults = {
    req: {},
    res: { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() },
    next: vi.fn(),
    err: { message: "Default Error", code: 500 },
  };
  const context = { ...defaults, ...override };
  error(context.err, context.req, context.res, context.next);
  return context;
};
