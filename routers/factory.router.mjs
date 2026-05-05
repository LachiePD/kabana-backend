import { Router } from "express";
import { assert } from "./assert.mjs";
import { requestHydrator } from "../requestHydrator/index.mjs";
export const resourceFactory = (config) => {
  assert(config);
  const router = Router();
  const method = config.method.toLowerCase();
  const path = config.path;
  const action = config.action;
  const service = config.service;
  const hydrator = config.hydrator;

  router[method](path, ...config.middleware, async (req, res, next) => {
    const payload = { params: req.params, query: req.query, body: req.body };
    const data = hydrator(payload);
    const response = await service[action](data);
    res.status(200).json(response);
    //TODO we will need to create a responseHydrator, as the response will change if the backend is trying to set a cookie or not
  });
  return router;
};
