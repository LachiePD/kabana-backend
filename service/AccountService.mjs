import { AppError } from "#/error/AppError.mjs";

export class AccountService {
  constructor(repo) {
    this.repo = repo;
    this.type = "accounts";
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
}
