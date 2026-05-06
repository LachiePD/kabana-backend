import { Pool } from "pg";
import { DbConnection } from "#/infrastructure/index.mjs";
import { AccountRepository } from "#/repository/index.mjs";
import { AccountService } from "#/service/index.mjs";
import { requestHydrator } from "#/requestHydrator/index.mjs";

const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({ connectionString });
const db = new DbConnection(pool);
const AccountRepo = new AccountRepository(db);
const accountService = new AccountService(AccountRepo);

export const routeConfigs = [
  {
    method: "POST",
    path: "/accounts",
    middleware: [],
    service: accountService,
    action: "createAccount",
    hydrator: requestHydrator.createAccount,
  },
];
