import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 1. Calculate path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 2. RUN THE CONFIG IMMEDIATELY
dotenv.config({ path: resolve(__dirname, "../.env") });

// 3. NOW import your other tools
import pg from "pg";
const { Pool } = pg;
import { DbConnection } from "./DbConnection.js";
import { describe, it, expect } from "vitest";

describe("the db connection", () => {
  it("connects to the db", async () => {
    // 4. Read the variable ONLY inside the test block
    const connectionString = process.env.DATABASE_URL;

    console.log(
      "Checking process.env keys:",
      Object.keys(process.env).filter((k) => k.includes("DATABASE")),
    );
    console.log("The Connection String is:", connectionString);

    const dbConnection = new DbConnection({
      Pool: Pool,
      connectionString: connectionString,
    });

    const result = await dbConnection.connect();
    expect(result).toBe(true);
  });
});
