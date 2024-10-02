'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For now, just set the response to whatever the prompt is (placeholder)
    setResponse(`You typed: ${prompt}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Input Field */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full text-center p-4 border-2 border-gray-300 rounded-lg text-lg"
            style={{ fontSize: '24px', width: '400px' }}
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            style={{ fontSize: '18px' }}
          >
            Submit
          </button>
        </form>

        {/* Output Display */}
        {response && (
          <div
            className="mt-6 p-4 bg-gray-200 border border-gray-300 rounded-lg"
            style={{ width: '400px', fontSize: '18px', textAlign: 'center' }}
          >
            <p>{response}</p>
          </div>
        )}
      </main>

      {/* Footer with Links */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://coda.io/@yourusername/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          About
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://coda.io/@yourusername/projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          Projects
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://coda.io/@yourusername/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}