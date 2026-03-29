import express from "express";
import { error } from "../middleware/index.mjs";
export const app = (router) => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(error);
  return app;
};
