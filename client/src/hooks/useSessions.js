import { useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import useChatStore from "../store/chatStore";

/**
 * Manages session list, creation, switching, and deletion.
 */
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

  /** Fetch all sessions from the server */
  const fetchSessions = useCallback(async () => {
    try {
      const data = await axiosInstance.get("/sessions");
      setSessions(data.data);
    } catch (error) {
      console.error("fetchSessions:", error.message);
    }
  }, [setSessions]);

  /** Create a new session and switch to it */
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

  /** Load a session's history and switch to it */
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

  /** Delete a session; if active, start a new one */
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
