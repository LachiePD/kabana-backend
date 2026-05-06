import { AppError } from "#/error/index.mjs";

export const login = (payload) => {
  const { name, password } = payload.body;

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

  return {
    name: cleanName,
    password: cleanPassword,
  };
};
