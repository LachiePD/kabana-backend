import { AppError } from "#/error/index.mjs";

export const createAccount = (input = {}) => {
  const { name, password } = input;

  const cleanName = typeof name === "string" ? name.trim() : name;
  const cleanPassword =
    typeof password === "string" ? password.trim() : password;

  if (!cleanName) {
    throw new AppError({
      message: "missing account name",
      status: 400,
    });
  }

  if (typeof cleanName !== "string") {
    throw new AppError({
      message: "invalid account name type",
      status: 400,
    });
  }

  if (!cleanPassword) {
    throw new AppError({
      message: "missing password",
      status: 400,
    });
  }

  if (typeof cleanPassword !== "string") {
    throw new AppError({
      message: "invalid password type",
      status: 400,
    });
  }

  if (cleanPassword.length < 8) {
    throw new AppError({
      message: "password too short (min 8 characters)",
      status: 400,
    });
  }

  if (!/[a-zA-Z]/.test(cleanPassword)) {
    throw new AppError({
      message: "password must contain a letter",
      status: 400,
    });
  }

  if (!/[0-9]/.test(cleanPassword)) {
    throw new AppError({
      message: "password must contain a number",
      status: 400,
    });
  }

  return {
    name: cleanName,
    password: cleanPassword,
  };
};
