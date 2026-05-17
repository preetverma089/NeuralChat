import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatWindow from "../components/chat/ChatWindow";
import useSessions from "../hooks/useSessions";

const ChatPage = () => {
  const { fetchSessions, createNewSession, activeSessionId } = useSessions();

  useEffect(() => {
    const init = async () => {
      await fetchSessions();
      if (!activeSessionId) {
        await createNewSession();
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen h-dvh bg-dark-900 overflow-hidden">
      <Sidebar />
      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <ChatWindow />
      </main>
    </div>
  );
};

export default ChatPage;
