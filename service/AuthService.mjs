import jwt from "jsonwebtoken";
import { AppError } from "#/error/index.mjs";
const SECRET = process.env.SECRET;

export class AuthService {
  constructor(repo) {
    this.repo = repo;
  }
  async login(account) {
    const exists = await this.repo.findByName("account", account.name);
    if (!exists) {
      throw new AppError({ message: "Invalid credentials", code: 404 });
    }
    const token = jwt.sign({ data: account.name }, SECRET, { expiresIn: "1h" });
    return token;
  }
}
