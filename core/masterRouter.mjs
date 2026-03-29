import { Router } from "express";
import { subRouter } from "./subRouter.mjs";

export const masterRouter = (arr) => {
  const master = Router();

  arr.reduce((acc, config) => {
    const { path, router } = subRouter(config);
    acc.use(path, router);
    return acc;
  }, master);

  return master;
};
