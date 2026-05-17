import ChatSession from "../models/ChatSession.js";
import { streamChatResponse } from "../services/chatService.js";
import logger from "../utils/logger.js";

export const sendMessage = async (req, res, next) => {
  const { message, sessionId } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const session = await ChatSession.findOrCreate(sessionId);

    session.addMessage("user", message);
    await session.save();

    const history = session.messages.slice(0, -1);

    logger.info(`Streaming response for session: ${sessionId}`);
    const aiResponse = await streamChatResponse(message, history, (chunk) => {
      res.write(`data: ${JSON.stringify({ chunk, done: false })}\n\n`);
    });

    session.addMessage("assistant", aiResponse);
    await session.save();

    res.write(`data: ${JSON.stringify({ chunk: "", done: true, sessionId })}\n\n`);
    res.end();
  } catch (error) {
    logger.error(`sendMessage error: ${error.message}`);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: "AI response failed", done: true })}\n\n`);
      res.end();
    } else {
      next(error);
    }
  }
};

export const getChatHistory = async (req, res, next) => {
  const { sessionId } = req.params;

  try {
    const session = await ChatSession.findOne({ sessionId }).lean();
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found" });
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
