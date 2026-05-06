import express from "express";
import { error } from "./middleware/index.mjs";
import { AccountService } from "#/service/index.mjs";
import { AccountRepository } from "#/repository/index.mjs";
import { DbConnection } from "#/infrastructure/index.mjs";
import { requestHydrator } from "#/requestHydrator/index.mjs";
import { AppError } from "#/error/AppError.mjs";
import { Pool } from "pg";
const NODE_ENV = process.env.NODE_ENV;
const connectionString = process.env.CONNECTION_STRING;

export const createApp = (routeDeps) => {
  const pool = new Pool({ connectionString });
  const db = new DbConnection(pool);
  const AccountRepo = new AccountRepository(db);
  const accountService = new AccountService(AccountRepo);
  const app = express();

  app.use(express.json());
  app.post("/accounts", async (req, res) => {
    const safeInput = requestHydrator.createAccount(req.body);
    const id = await accountService.createAccount(safeInput);
    return res.status(200).json({ id });
  });
  app.post("/login", async (req, res) => {
    const safeInput = requestHydrator.login(req.body);
    const { token } = await accountService.login(safeInput);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "test" ? false : true,
        sameSite: "lax",
      })
      .json({ message: "Login successful" });
  });
  app.use(error);
  return app;
};
