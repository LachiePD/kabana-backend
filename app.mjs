import express from "express";
import { error } from "./middleware/index.mjs";
import { resourceFactory, routeConfigs } from "#/routers/index.mjs";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  routeConfigs.forEach((config) => app.use(resourceFactory(config)));
  app.use(error);
  return app;
};
