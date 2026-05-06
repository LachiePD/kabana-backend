import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "#/error/index.mjs";
const SECRET = process.env.SECRET;

export class AuthService {
  constructor(repo) {
    this.repo = repo;
  }
  async isPasswordCorrect(plaintext, hashed) {
    return bcrypt.compare(plaintext, hashed);
  }

  async login(account) {
    const exists = await this.repo.getByName(account.name);
    if (!exists) {
      throw new AppError({ message: "Invalid credentials", code: 404 });
    }
    const passwordCorrect = await this.isPasswordCorrect(account.password, exists.password);
    if (!passwordCorrect) {
      throw new AppError({ message: "Invalid credentials", code: 401 });
    }
    const token = jwt.sign({ data: account.name }, SECRET, { expiresIn: "1h" });
    return token;
  }
}
