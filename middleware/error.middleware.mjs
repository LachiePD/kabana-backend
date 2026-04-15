export const error = (error, req, res, next) => {
  if (error) {
    console.error(error);
    return res
      .status(error.code)
      .json({ message: error.message, code: error.code });
  }
  next();
};
