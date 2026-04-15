import { routeDependency } from "./routeDependency.mjs";
import { app } from "./app.mjs";
import { errMiddleware } from "./createErrMiddleware.mjs";
import { repository } from "./repository.mjs";
import { db } from "./db.mjs";
export { createPayload } from "./payload.mjs";

export const createMock = {
  routeDependency,
  app,
  repository,
  db,
  errMiddleware,
};
