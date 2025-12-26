"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState<string>("");
  const [tone, setTone] = useState<string>("Motivational");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const generateQuote = async () => {
    setIsLoading(true);
    setError("");
    setQuote("");

    try {
      const response = await fetch("/api/generateQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tone }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quote");
      }

      const data = await response.json();
      setQuote(data.quote);
    } catch (err) {
      setError("Failed to generate quote. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          AI Quote Generator
        </h1>

        {/* Tone Input */}
        <div className="mb-6">
          <label
            htmlFor="tone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter Quote Tone:
          </label>
          <input
            type="text"
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="e.g., Motivational, Funny, Inspirational..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-700 bg-white"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateQuote}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </>
          ) : (
            "Generate Quote"
          )}
        </button>

        {/* Quote Display Area */}
        <div className="mt-8 min-h-[120px] bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-200">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : quote ? (
            <blockquote className="text-lg text-gray-700 italic text-center">
              &ldquo;{quote}&rdquo;
            </blockquote>
          ) : (
            <p className="text-gray-400 text-center">
              Your generated quote will appear here...
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Powered by OpenAI
        </p>
      </div>
    </main>
  );
}
