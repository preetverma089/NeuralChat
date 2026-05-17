import mongoose from "mongoose";

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
    _id: false,
    timestamps: false,
    versionKey: false,
  }
);

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
    timestamps: true,
    versionKey: false,
  }
);

chatSessionSchema.methods.addMessage = function (role, content) {
  this.messages.push({ role, content });

  if (this.messages.length === 1 && role === "user") {
    this.title = content.length > 55 ? content.substring(0, 55) + "..." : content;
  }
};

chatSessionSchema.statics.findOrCreate = async function (sessionId) {
  let session = await this.findOne({ sessionId });
  if (!session) {
    session = new this({ sessionId });
  }
  return session;
};

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
