import express from "express";
import { error } from "./middleware/index.mjs";
import { AccountService } from "#/service/index.mjs";
import { Repository } from "#/repository/index.mjs";
import { DbConnection } from "#/infrastructure/index.mjs";
import { requestHydrator } from "#/requestHydrator/index.mjs";
import { AppError } from "#/error/AppError.mjs";
import { Pool } from "pg";
const connectionString = process.env.CONNECTION_STRING;

export const createApp = (routeDeps) => {
  const pool = new Pool({ connectionString });
  const db = new DbConnection(pool);
  const repo = new Repository(db);
  const accountService = new AccountService(repo);
  const app = express();

  app.use(express.json());
  app.post("/accounts", async (req, res) => {
    const safeInput = requestHydrator.createAccount(req.body);

    const id = await accountService.createAccount(safeInput);
    return res.status(200).json({ id });
  });
  app.use(error);
  return app;
};
