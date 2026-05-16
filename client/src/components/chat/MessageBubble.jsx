import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../../utils/markdownParser";

const MessageBubble = ({ message, isStreaming }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 animate-fade-up ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-xl flex items-center justify-center
          text-xs font-bold shrink-0 mt-0.5
          ${
            isUser
              ? "bg-gradient-to-br from-brand to-pink-accent text-white"
              : "bg-dark-700 border border-dark-600 text-gray-400"
          }
        `}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${
            isUser
              ? "bg-brand/10 border border-brand/20 rounded-tr-sm text-gray-100"
              : "bg-dark-700 border border-dark-600 rounded-tl-sm text-gray-200"
          }
        `}
      >
        {isUser ? (
          // User messages: plain text, preserve whitespace
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          // AI messages: full markdown rendering
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {message.content}
            </ReactMarkdown>

            {/* Streaming cursor */}
            {isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-brand animate-blink ml-0.5 align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
