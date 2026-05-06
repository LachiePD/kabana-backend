import { Pool } from "pg";
import { DbConnection } from "#/infrastructure/index.mjs";
import { AccountRepository } from "#/repository/index.mjs";
import { AccountService, AuthService } from "#/service/index.mjs";
import { requestHydrator } from "#/requestHydrator/index.mjs";

const NODE_ENV = process.env.NODE_ENV;
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({ connectionString });
const db = new DbConnection(pool);
const AccountRepo = new AccountRepository(db);
const accountService = new AccountService(AccountRepo);
const authService = new AuthService(AccountRepo);

export const routeConfigs = [
  {
    method: "POST",
    path: "/accounts",
    middleware: [],
    service: accountService,
    action: "createAccount",
    hydrator: requestHydrator.createAccount,
  },
  {
    method: "POST",
    path: "/login",
    middleware: [],
    service: authService,
    action: "login",
    hydrator: requestHydrator.login,
    onSuccess: (res, token) => {
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: NODE_ENV === "test" ? false : true,
          sameSite: "lax",
        })
        .json({ message: "Login successful" });
    },
  },
];
