import { Router } from "express";
import { body, param } from "express-validator";
import { sendMessage, getChatHistory } from "../controllers/chatController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { chatLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/message",
  chatLimiter,
  [
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message cannot be empty")
      .isLength({ max: 5000 })
      .withMessage("Message too long (max 5000 chars)"),
    body("sessionId")
      .trim()
      .notEmpty()
      .withMessage("sessionId is required")
      .isUUID()
      .withMessage("sessionId must be a valid UUID"),
  ],
  validateRequest,
  sendMessage
);

router.get(
  "/history/:sessionId",
  [
    param("sessionId")
      .trim()
      .isUUID()
      .withMessage("sessionId must be a valid UUID"),
  ],
  validateRequest,
  getChatHistory
);

export default router;
