import React from "react";
import useChatStore from "../../store/chatStore";
import useSessions from "../../hooks/useSessions";

const Header = () => {
  const { toggleSidebar, isSidebarOpen, isStreaming } = useChatStore();
  const { activeSessionId, sessions } = useSessions();

  const activeTitle =
    sessions.find((s) => s.sessionId === activeSessionId)?.title || "New Chat";

  return (
    <header className="flex items-center gap-3 px-3 md:px-4 py-3.5 border-b border-dark-600 bg-dark-800 shrink-0">
      <button
        onClick={toggleSidebar}
        className={`
          text-gray-400 hover:text-white p-2 rounded-lg
          hover:bg-dark-700 transition-colors shrink-0 touch-manipulation
          ${isSidebarOpen ? "md:hidden" : "block"}
        `}
        aria-label="Toggle sidebar"
      >
        {/* Animated hamburger / close icon */}
        <div className="w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${isSidebarOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
          />
        </div>
      </button>

      {/* Session title */}
      <h1 className="text-sm font-semibold text-gray-200 truncate flex-1 min-w-0">
        {activeTitle}
      </h1>

      {/* Status indicator */}
      <div className="flex items-center gap-2 shrink-0">
        {isStreaming ? (
          <span className="flex items-center gap-1.5 text-xs text-brand font-medium">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="hidden sm:inline">Thinking...</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/60" />
            <span className="hidden sm:inline">Online</span>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
