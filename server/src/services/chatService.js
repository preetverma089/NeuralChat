import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import logger from "../utils/logger.js";

const SYSTEM_PROMPT = `You are NeuralChat, a helpful and intelligent AI assistant.
You have a great memory and always refer back to the conversation history when relevant.
Keep responses clear, concise, and friendly. Format code with proper markdown code blocks.
If you don't know something, say so honestly. Never make up facts.`;

let modelInstance = null;

const getModel = () => {
  if (!modelInstance) {
    modelInstance = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      maxTokens: 2048,
      streaming: true,
    });
    logger.info("LangChain Groq model initialized");
  }
  return modelInstance;
};

const toLangChainMessages = (history) =>
  history.map((m) =>
    m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  );

export const streamChatResponse = async (userMessage, history, onChunk) => {
  const model = getModel();

  const messages = [
    new SystemMessage(SYSTEM_PROMPT),
    ...toLangChainMessages(history),
    new HumanMessage(userMessage),
  ];

  let fullResponse = "";

  try {
    const stream = await model.stream(messages);

    for await (const chunk of stream) {
      const text = chunk.content;
      if (text) {
        fullResponse += text;
        onChunk(text);
      }
    }

    return fullResponse;
  } catch (error) {
    logger.error(`LangChain streaming error: ${error.message}`);
    throw error;
  }
};
