export class AppError extends Error {
  constructor({ message, status }) {
    if (message == null || typeof message !== "string" || message === "") {
      throw new Error("AppError: invalid message");
    }

    if (status == null || typeof status !== "number") {
      throw new Error("AppError: invalid status");
    }

    super(message);
    this.status = status;
  }
}
