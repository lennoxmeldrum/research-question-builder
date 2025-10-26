import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AiSuggestionProps {
  suggestion?: string;
}

const AiSuggestion: React.FC<AiSuggestionProps> = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 rounded-r-lg animate-fade-in">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Sparkle Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2.293-2.293a1 1 0 010-1.414L12 4.001M16 12l2.293 2.293a1 1 0 010 1.414L14 20l-2.293-2.293a1 1 0 010-1.414L16 12z" />
          </svg>
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <h3 className="text-lg font-bold text-indigo-800">AI Mentor Feedback</h3>
          <div className="mt-2 text-base text-indigo-700 prose prose-indigo max-w-none">
            {/* The 'prose' classes from Tailwind's typography plugin will style the markdown output */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{suggestion}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSuggestion;