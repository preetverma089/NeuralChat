import { Router } from "express";
import { param } from "express-validator";
import {
  getAllSessions,
  createSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = Router();

router.get("/", getAllSessions);
router.post("/", createSession);

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
