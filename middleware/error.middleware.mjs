export const error = (error, req, res, next) => {
  console.error(error);
  return res.status(error.status).json({ message: error.message });
};
