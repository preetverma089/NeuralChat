import React from "react";

export const markdownComponents = {
  code({ inline, children, ...props }) {
    return inline ? (
      <code
        className="bg-dark-900 text-brand-light font-mono text-xs px-1.5 py-0.5 rounded-md"
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="bg-dark-900 border border-dark-600 rounded-xl p-4 overflow-x-auto my-3">
        <code className="font-mono text-xs text-gray-200 leading-5" {...props}>
          {children}
        </code>
      </pre>
    );
  },
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="text-gray-300">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-2 mt-3">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-bold text-white mb-2 mt-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-bold text-white mb-1 mt-2">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brand pl-3 my-2 text-gray-400 italic">
      {children}
    </blockquote>
  ),
};
