import { v4 as uuidv4 } from "uuid";
import ChatSession from "../models/ChatSession.js";
import logger from "../utils/logger.js";

/**
 * GET /api/sessions
 * Returns all sessions (sorted by latest update) for the sidebar.
 */
export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await ChatSession.find(
      {},
      { sessionId: 1, title: 1, updatedAt: 1, _id: 0 }
    )
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/sessions
 * Creates a new session and returns its ID.
 */
export const createSession = async (req, res, next) => {
  try {
    const sessionId = uuidv4();
    res.status(201).json({ success: true, data: { sessionId } });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/sessions/:sessionId
 * Deletes a session and all its messages.
 */
export const deleteSession = async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const result = await ChatSession.deleteOne({ sessionId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Session not found" });
    }

    logger.info(`Session deleted: ${sessionId}`);
    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    next(error);
  }
};
