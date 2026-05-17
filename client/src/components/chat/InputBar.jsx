import React, { useState, useRef, useEffect } from "react";

const InputBar = ({ onSend, isStreaming }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const isMobile = () => window.innerWidth < 768;

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }, [value]);

  useEffect(() => {
    if (!isMobile()) {
      textareaRef.current?.focus();
    }
  }, []);

  const handleSend = () => {
    if (!value.trim() || isStreaming) return;
    onSend(value.trim());
    setValue("");
    if (isMobile()) textareaRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile()) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isStreaming;

  return (
    <div className="px-3 md:px-4 py-3 border-t border-dark-600 bg-dark-800 shrink-0">
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
            isStreaming ? "Waiting for response..." : "Message NeuralChat..."
          }
          disabled={isStreaming}
          rows={1}
          className="
            flex-1 resize-none bg-transparent outline-none
            text-sm text-gray-100 placeholder-gray-500
            font-sans leading-relaxed
            disabled:opacity-50 disabled:cursor-not-allowed
            py-1 max-h-28 overflow-y-auto
          "
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-0.5
            transition-all duration-200 touch-manipulation
            ${
              canSend
                ? "bg-brand text-white active:scale-95 hover:bg-brand-dark shadow-lg shadow-brand/25"
                : "bg-dark-600 text-gray-600 cursor-not-allowed"
            }
          `}
          aria-label="Send message"
        >
          {isStreaming ? (
            <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
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

      <p className="hidden md:block text-center text-gray-700 text-xs mt-2">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
};

export default InputBar;
