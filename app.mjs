import express from "express";
import { error } from "./middleware/index.mjs";
export const createApp = (routeDeps) => {
  const app = express();

  app.use(express.json());
  return app;
};
