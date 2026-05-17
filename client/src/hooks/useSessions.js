import { useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import useChatStore from "../store/chatStore";

const useSessions = () => {
  const {
    sessions,
    activeSessionId,
    setSessions,
    setActiveSession,
    addSession,
    removeSession,
    setMessages,
    clearMessages,
    setIsStreaming,
  } = useChatStore();

  const fetchSessions = useCallback(async () => {
    try {
      const data = await axiosInstance.get("/sessions");
      setSessions(data.data);
    } catch (error) {
      console.error("fetchSessions:", error.message);
    }
  }, [setSessions]);

  const createNewSession = useCallback(async () => {
    try {
      const data = await axiosInstance.post("/sessions");
      const { sessionId } = data.data;
      addSession({ sessionId, title: "New Chat", updatedAt: new Date() });
      setActiveSession(sessionId);
      clearMessages();
      setIsStreaming(false);
      return sessionId;
    } catch (error) {
      console.error("createNewSession:", error.message);
    }
  }, [addSession, setActiveSession, clearMessages, setIsStreaming]);

  const switchSession = useCallback(
    async (sessionId) => {
      if (sessionId === activeSessionId) return;
      try {
        const data = await axiosInstance.get(`/chat/history/${sessionId}`);
        setMessages(data.data.messages);
        setActiveSession(sessionId);
        setIsStreaming(false);
      } catch (error) {
        console.error("switchSession:", error.message);
      }
    },
    [activeSessionId, setMessages, setActiveSession, setIsStreaming]
  );

  const deleteSession = useCallback(
    async (sessionId) => {
      try {
        await axiosInstance.delete(`/sessions/${sessionId}`);
        removeSession(sessionId);
        if (sessionId === activeSessionId) {
          await createNewSession();
        }
      } catch (error) {
        console.error("deleteSession:", error.message);
      }
    },
    [activeSessionId, removeSession, createNewSession]
  );

  return {
    sessions,
    activeSessionId,
    fetchSessions,
    createNewSession,
    switchSession,
    deleteSession,
  };
};

export default useSessions;
