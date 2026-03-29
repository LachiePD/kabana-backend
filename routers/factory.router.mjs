import { Router } from "express";
import { assert } from "./assert.mjs";
import { requestHydrator } from "../requestHydrator/index.mjs";
export const resourceFactory = (dep) => {
  assert(dep);
  const router = Router();
  const method = dep.method.toLowerCase();
  const path = dep.path;
  const action = dep.action;
  const service = dep.service;

  router[method](path, ...dep.middleware, async (req, res, next) => {
    const payload = { params: req.params, query: req.query, body: req.body };
    const data = requestHydrator(payload);
    const response = await service[action](data);
    res.status(200).json(response);
  });
  return router;
};
