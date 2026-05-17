import Groq from "groq-sdk";
import logger from "../utils/logger.js";

const SYSTEM_PROMPT = `You are NeuralChat, a helpful and intelligent AI assistant.
You have a great memory and always refer back to the conversation history when relevant.
Keep responses clear, concise, and friendly. Format code with proper markdown code blocks.
If you don't know something, say so honestly. Never make up facts.`;

let client = null;

const getClient = () => {
  if (!client) {
    client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    logger.info("Groq client initialized");
  }
  return client;
};

const toMessages = (history, userMessage) => [
  { role: "system", content: SYSTEM_PROMPT },
  ...history.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
  { role: "user", content: userMessage },
];

export const streamChatResponse = async (userMessage, history, onChunk) => {
  let fullResponse = "";

  try {
    const stream = await getClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: toMessages(history, userMessage),
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        fullResponse += text;
        onChunk(text);
      }
    }

    return fullResponse;
  } catch (error) {
    logger.error(`Groq streaming error: ${error.message}`);
    throw error;
  }
};
