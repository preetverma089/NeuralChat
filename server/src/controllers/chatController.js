import ChatSession from "../models/ChatSession.js";
import { streamChatResponse } from "../services/chatService.js";
import logger from "../utils/logger.js";

/**
 * POST /api/chat/message
 * Sends a message and streams the AI response via SSE.
 */
export const sendMessage = async (req, res, next) => {
  const { message, sessionId } = req.body;

  // SSE headers belong here — the controller owns the HTTP response shape
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable Nginx buffering on Render

  try {
    // 1. Load or create session
    const session = await ChatSession.findOrCreate(sessionId);

    // 2. Persist the user message immediately so it's never lost if AI fails
    session.addMessage("user", message);
    await session.save();

    const history = session.messages.slice(0, -1); // history before this message

    // 3. Stream AI response token by token
    logger.info(`Streaming response for session: ${sessionId}`);
    const aiResponse = await streamChatResponse(message, history, (chunk) => {
      res.write(`data: ${JSON.stringify({ chunk, done: false })}\n\n`);
    });

    // 4. Persist AI response
    session.addMessage("assistant", aiResponse);
    await session.save();

    // 5. Send final SSE event
    res.write(
      `data: ${JSON.stringify({ chunk: "", done: true, sessionId })}\n\n`
    );
    res.end();
  } catch (error) {
    logger.error(`sendMessage error: ${error.message}`);
    if (res.headersSent) {
      res.write(
        `data: ${JSON.stringify({ error: "AI response failed", done: true })}\n\n`
      );
      res.end();
    } else {
      next(error);
    }
  }
};

/**
 * GET /api/chat/history/:sessionId
 * Returns the full message history for a session.
 */
export const getChatHistory = async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const session = await ChatSession.findOne({ sessionId }).lean();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, error: "Session not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId: session.sessionId,
        title: session.title,
        messages: session.messages,
      },
    });
  } catch (error) {
    next(error);
  }
};
