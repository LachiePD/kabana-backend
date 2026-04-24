import { AppError } from "#/error/AppError.mjs";
import bcrypt from "bcrypt";
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
    const result = await this.repo.createByEntity(this.type, account);
    return result.rows[0].id;
  }

  async userExists(accountName) {
    const result = await this.repo.getAllByType(this.type);
    return result.rows.some((account) => account.name === accountName);
  }

  async login(account) {
    const exists = await this.userExists(account.name);
    if (!exists) {
      throw new AppError({ message: "Invalid credentials", status: 401 });
    }
    const correctPassword = await this.isPasswordCorrect(account.password);
  }
  async isPasswordCorrect(account) {
    const givenPassword = account.password;
    const foundAccount = await this.repo.findByName(account.name);
    const foundPassword = foundAccount.password;
    const isMatch = await bcrypt.compare(givenPassword, foundPassword);
    if (!isMatch) {
      throw new AppError({ status: 401, message: "Passwords dont match" });
    }
    return true;
  }
}
