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

    const result = await this.repo.createByEntity(this.type, newAccount);
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
    const correctPassword = await this.isPasswordCorrect(account);
    const token = jwt.sign({ data: account.name }, SECRET, { expiresIn: "1h" });
    return { token };
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
