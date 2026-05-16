import React from "react";
import useSessions from "../../hooks/useSessions";
import useChatStore from "../../store/chatStore";

const Sidebar = () => {
  const { sessions, activeSessionId, createNewSession, switchSession, deleteSession } =
    useSessions();
  const { isSidebarOpen, toggleSidebar } = useChatStore();

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed md:relative z-20 h-full
          bg-dark-800 border-r border-dark-600
          flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-dark-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-brand text-lg">⚡</span>
            <span className="font-bold text-sm bg-gradient-to-r from-brand to-pink-accent bg-clip-text text-transparent">
              NeuralChat
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-white p-1 rounded-md hover:bg-dark-700 transition-colors"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={createNewSession}
            className="
              w-full py-2.5 px-4 rounded-xl
              bg-brand hover:bg-brand-dark
              text-white text-sm font-semibold
              transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/20
            "
          >
            + New Chat
          </button>
        </div>

        {/* Session List */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
          {sessions.length === 0 ? (
            <p className="text-center text-gray-600 text-xs mt-8 px-4">
              No chats yet. Start a new conversation!
            </p>
          ) : (
            sessions.map((session) => (
              <SessionItem
                key={session.sessionId}
                session={session}
                isActive={session.sessionId === activeSessionId}
                onSelect={() => switchSession(session.sessionId)}
                onDelete={() => deleteSession(session.sessionId)}
              />
            ))
          )}
        </nav>
      </aside>
    </>
  );
};

// ── SessionItem subcomponent ─────────────────────────────────
const SessionItem = ({ session, isActive, onSelect, onDelete }) => (
  <div
    onClick={onSelect}
    className={`
      group flex items-center justify-between
      px-3 py-2.5 rounded-xl cursor-pointer
      transition-all duration-150 text-sm
      ${
        isActive
          ? "bg-brand/15 border border-brand/30 text-white"
          : "text-gray-400 hover:bg-dark-700 hover:text-gray-200"
      }
    `}
  >
    <span className="truncate flex-1 pr-2 font-medium">
      {session.title || "New Chat"}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="
        opacity-0 group-hover:opacity-100
        text-gray-600 hover:text-red-400
        text-xs p-1 rounded transition-all
      "
      aria-label="Delete session"
    >
      ✕
    </button>
  </div>
);

export default Sidebar;
