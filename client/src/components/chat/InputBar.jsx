import React, { useState, useRef, useEffect } from "react";

const InputBar = ({ onSend, isStreaming }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 140) + "px";
    }
  }, [value]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!value.trim() || isStreaming) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e) => {
    // Enter → send | Shift+Enter → newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isStreaming;

  return (
    <div className="px-4 py-3 border-t border-dark-600 bg-dark-800 shrink-0">
      <div
        className={`
          flex items-end gap-2 rounded-2xl border px-3 py-2
          bg-dark-700 transition-colors duration-200
          ${canSend ? "border-brand/50" : "border-dark-600"}
        `}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isStreaming ? "Waiting for response..." : "Type a message..."
          }
          disabled={isStreaming}
          rows={1}
          className="
            flex-1 resize-none bg-transparent outline-none
            text-sm text-gray-100 placeholder-gray-600
            font-sans leading-relaxed
            disabled:opacity-50 disabled:cursor-not-allowed
            py-1 max-h-36 overflow-y-auto
          "
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mb-0.5
            transition-all duration-200
            ${
              canSend
                ? "bg-brand text-white hover:bg-brand-dark hover:scale-105 shadow-lg shadow-brand/25"
                : "bg-dark-600 text-gray-600 cursor-not-allowed"
            }
          `}
          aria-label="Send message"
        >
          {isStreaming ? (
            <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-center text-gray-700 text-xs mt-2">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBar;
