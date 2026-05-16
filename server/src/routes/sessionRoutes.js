import { Router } from "express";
import { param } from "express-validator";
import {
  getAllSessions,
  createSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = Router();

/** GET  /api/sessions        — List all sessions */
router.get("/", getAllSessions);

/** POST /api/sessions        — Create new session */
router.post("/", createSession);

/** DELETE /api/sessions/:sessionId */
router.delete(
  "/:sessionId",
  [
    param("sessionId")
      .trim()
      .isUUID()
      .withMessage("sessionId must be a valid UUID"),
  ],
  deleteSession
);

export default router;
