import { create } from "zustand";

/**
 * Global state for NeuralChat.
 * Zustand — simple, no boilerplate, React 18 compatible.
 */
const useChatStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────
  sessions: [],           // [{ sessionId, title, updatedAt }]
  activeSessionId: null,  // Currently open session
  messages: [],           // [{ role, content }] for active session
  isStreaming: false,     // Is AI currently generating?
  isSidebarOpen: true,    // Sidebar visibility

  // ── Session actions ────────────────────────────────────────
  setSessions: (sessions) => set({ sessions }),

  setActiveSession: (sessionId) => set({ activeSessionId: sessionId }),

  addSession: (session) =>
    set((state) => ({ sessions: [session, ...state.sessions] })),

  removeSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.sessionId !== sessionId),
    })),

  updateSessionTitle: (sessionId, title) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.sessionId === sessionId ? { ...s, title } : s
      ),
    })),

  // ── Message actions ────────────────────────────────────────
  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  /** Append a chunk of text to the last (assistant) message */
  appendChunkToLast: (chunk) =>
    set((state) => {
      const msgs = [...state.messages];
      const last = msgs[msgs.length - 1];
      if (last && last.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: last.content + chunk };
      }
      return { messages: msgs };
    }),

  /** Replace the last message (used when stream errors out) */
  replaceLastMessage: (message) =>
    set((state) => {
      const msgs = [...state.messages];
      msgs[msgs.length - 1] = message;
      return { messages: msgs };
    }),

  // ── UI actions ─────────────────────────────────────────────
  setIsStreaming: (val) => set({ isStreaming: val }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setSidebarOpen: (val) => set({ isSidebarOpen: val }),

  // ── Reset ──────────────────────────────────────────────────
  clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
