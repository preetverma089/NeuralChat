import mongoose from "mongoose";

// ── Sub-schema: Individual Message ───────────────────────────
const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,           // No separate _id for subdocuments
    timestamps: false,
    versionKey: false,
  }
);

// ── Main Schema: Chat Session ────────────────────────────────
const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
      maxlength: 60,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,     // Adds createdAt and updatedAt automatically
    versionKey: false,
  }
);

// ── Instance method: Add a message ───────────────────────────
chatSessionSchema.methods.addMessage = function (role, content) {
  this.messages.push({ role, content });

  // Auto-title from first user message
  if (this.messages.length === 1 && role === "user") {
    this.title =
      content.length > 55 ? content.substring(0, 55) + "..." : content;
  }
};

// ── Static method: Find or create session ────────────────────
chatSessionSchema.statics.findOrCreate = async function (sessionId) {
  let session = await this.findOne({ sessionId });
  if (!session) {
    session = new this({ sessionId });
  }
  return session;
};

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
