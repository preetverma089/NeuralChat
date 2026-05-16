import React from "react";

const SUGGESTIONS = [
  "Explain LangChain in simple words",
  "What is LangGraph and how does it work?",
  "Write a JavaScript async/await example",
  "How does MongoDB indexing work?",
];

const EmptyState = ({ onSuggestionClick }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 py-16 gap-6">
    {/* Icon */}
    <div className="w-20 h-20 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center text-4xl shadow-xl shadow-brand/10">
      🤖
    </div>

    {/* Text */}
    <div>
      <h2 className="text-xl font-bold text-white mb-2">
        How can I help you today?
      </h2>
      <p className="text-sm text-gray-500 max-w-xs">
        I remember our full conversation — ask me anything!
      </p>
    </div>

    {/* Suggestion chips */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSuggestionClick(s)}
          className="
            text-left px-4 py-3 rounded-xl text-sm
            bg-dark-700 border border-dark-600
            text-gray-400 hover:text-gray-100
            hover:border-brand/40 hover:bg-brand/5
            transition-all duration-200
          "
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

export default EmptyState;
