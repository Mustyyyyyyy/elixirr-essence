export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production" ? "Server error" : err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};