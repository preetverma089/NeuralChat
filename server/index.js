import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db.js";
import { validateEnv } from "./src/config/env.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { apiLimiter } from "./src/middleware/rateLimiter.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import logger from "./src/utils/logger.js";

// ── Load & validate env vars ─────────────────────────────────
dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Global Middleware ────────────────────────────────────────
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        process.env.CLIENT_URL,
        /\.vercel\.app$/,  // allow all vercel preview URLs
      ]
    : [/^http:\/\/localhost:\d+$/];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ────────────────────────────────────────────
app.use("/api/", apiLimiter);

// ── Routes ───────────────────────────────────────────────────
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// ── Health Check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "NeuralChat server is running 🚀",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.success(`Server running on http://localhost:${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
