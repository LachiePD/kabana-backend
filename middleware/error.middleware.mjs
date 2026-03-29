export const error = (error, req, res, next) => {
  if (error) {
    console.error(error);
    res
      .status(error.code)
      .json({ message: "Error talking to backend", code: error.code });
  }
};
