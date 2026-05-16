import logger from "../utils/logger.js";

/**
 * Global Express error handler.
 * Must have 4 parameters for Express to recognize it as an error handler.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} | ${req.method} ${req.originalUrl}`);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, error: errors.join(", ") });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ success: false, error: "Duplicate resource" });
  }

  // Generic server error — never leak stack trace in production
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message;

  res.status(statusCode).json({ success: false, error: message });
};
