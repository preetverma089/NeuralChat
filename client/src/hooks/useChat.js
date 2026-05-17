import { useCallback } from "react";
import useChatStore from "../store/chatStore";
import axiosInstance from "../api/axiosInstance";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const useChat = () => {
  const {
    messages,
    isStreaming,
    activeSessionId,
    addMessage,
    appendChunkToLast,
    replaceLastMessage,
    setIsStreaming,
  } = useChatStore((state) => state);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isStreaming || !activeSessionId) return;

      addMessage({ role: "user", content: text.trim() });
      addMessage({ role: "assistant", content: "" });
      setIsStreaming(true);

      try {
        const response = await fetch(`${API_BASE}/chat/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim(), sessionId: activeSessionId }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Server error");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const rawText = decoder.decode(value, { stream: true });
          const lines = rawText.split("\n").filter((line) => line.startsWith("data: "));

          for (const line of lines) {
            try {
              const json = JSON.parse(line.slice(6));

              if (json.error) throw new Error(json.error);
              if (json.chunk) appendChunkToLast(json.chunk);
              if (json.done) {
                setIsStreaming(false);
                const { setSessions } = useChatStore.getState();
                const data = await axiosInstance.get("/sessions");
                setSessions(data.data);
              }
            } catch (parseErr) {}
          }
        }
      } catch (error) {
        console.error("sendMessage error:", error.message);
        replaceLastMessage({
          role: "assistant",
          content: `❌ **Error:** ${error.message}. Please try again.`,
        });
        setIsStreaming(false);
      }
    },
    [isStreaming, activeSessionId, addMessage, appendChunkToLast, replaceLastMessage, setIsStreaming]
  );

  return { messages, isStreaming, sendMessage };
};

export default useChat;
