import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import useSessions from "../hooks/useSessions";

const ChatPage = () => {
  const { fetchSessions, createNewSession, activeSessionId } = useSessions();

  // On first load — fetch sessions and start a new chat
  useEffect(() => {
    const init = async () => {
      await fetchSessions();
      // Only create new session if none is active
      if (!activeSessionId) {
        await createNewSession();
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      <Sidebar />

      {/* Main chat area */}
      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <ChatWindow />
      </main>
    </div>
  );
};

export default ChatPage;
