import React from "react";
import useChatStore from "../../store/chatStore";
import useSessions from "../../hooks/useSessions";

const Header = () => {
  const { toggleSidebar, isSidebarOpen, isStreaming } = useChatStore();
  const { activeSessionId, sessions } = useSessions();

  const activeTitle =
    sessions.find((s) => s.sessionId === activeSessionId)?.title || "New Chat";

  return (
    <header className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-600 bg-dark-800 shrink-0">
      {/* Hamburger — always visible */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-dark-700 transition-colors"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      {/* Session title */}
      <h1 className="text-sm font-semibold text-gray-200 truncate flex-1">
        {activeTitle}
      </h1>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        {isStreaming ? (
          <span className="flex items-center gap-1.5 text-xs text-brand font-medium">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            Thinking...
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/60" />
            Online
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
