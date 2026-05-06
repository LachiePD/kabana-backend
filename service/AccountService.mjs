import { AppError } from "#/error/AppError.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;
export class AccountService {
  constructor(repo) {
    this.repo = repo;
    this.type = "accounts";
  }

  async findByName(name) {
    return { password: "Password123" };
  }

  async createAccount(account) {
    const exists = await this.userExists(account.name);
    if (exists) {
      throw new AppError({ message: "username taken", status: 400 });
    }
    const hashedPassword = await bcrypt.hash(account.password, 10);
    const newAccount = { ...account, password: hashedPassword };

    const result = await this.repo.create(newAccount);
    return result.rows[0].id;
  }

  async userExists(accountName) {
    //TODO, this is returning the whole table, we can just query the db for one entry
    const result = await this.repo.getAll();
    return result.rows.some((account) => account.name === accountName);
  }
}
