import { Router } from "express";
export const subRouter = (config) => {
  if (!config.path || !config.method || !config.service) {
    throw new Error(
      "Invalid Configuration: Path, Method, and Service are required.",
    );
  }
  const router = Router();
  const method = config.method.toLowerCase();
  const middleware = config.middleware || [];
  router[method](config.path, ...middleware, async (req, res) => {
    const data = await config.service;
    res.json(data);
  });

  return {
    path: config.path,
    router: router,
  };
};
