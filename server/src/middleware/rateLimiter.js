import rateLimit from "express-rate-limit";

/**
 * General API rate limiter:
 * Max 100 requests per 15 minutes per IP.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please wait a few minutes and try again.",
  },
});

/**
 * Strict limiter for the chat endpoint:
 * Max 30 messages per 5 minutes per IP.
 */
export const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many messages sent. Please slow down.",
  },
});
