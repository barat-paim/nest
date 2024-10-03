'use client'

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [prompt, setPrompt] = useState(''); // User input for the prompt
  const [response, setResponse] = useState(''); // Text response from OpenAI
  const [audioSrc, setAudioSrc] = useState(''); // Audio source for voice response
  const [selectedTab, setSelectedTab] = useState('text'); // Track whether user selects text or voice response
  const [loading, setLoading] = useState(false); // Loading state to show spinner or feedback
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
     console.log("audio source: ", audioSrc);
     if (inputRef.current) {
      inputRef.current.focus();
     }
  },  [audioSrc]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === '') return;
    setLoading(true);

    try {
      // Send request to the backend API
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, responseType: selectedTab }), // Send prompt and responseType (text/voice)
      });

      if (selectedTab === 'text') {
        const textResponse = await res.text(); // For text, read the plain text response
        setResponse(textResponse); // Set the response to display
        setAudioSrc(''); // Clear audio when in text mode
      } else if (selectedTab === 'voice') {
        setAudioSrc('');
        const blob = await res.blob(); // For voice, get the blob of the audio
        const audioUrl = URL.createObjectURL(blob); // Create a URL for the audio blob
        setAudioSrc(audioUrl); // Set the audio source for playback
        setResponse(''); // Clear text response when in voice mode
      }
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setLoading(false); // Stop the loading state
    }

    setPrompt(''); // Clear the input after submission
  };

  return (
    <div className="min-h-screen bg-[#323437] text-[#d1d0c5] font-mono flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#e2b714] rounded"></div>
          <span className="text-xl font-bold">Compose AI</span>
        </div>
        <nav className="flex space-x-4">
          <a href="#" className="text-sm text-[#d1d0c5] hover:underline">
            <i className="fas fa-keyboard mr-2"></i>
            Test
          </a>
          <a href="#" className="text-sm text-[#d1d0c5] hover:underline">
            <i className="fas fa-chart-line mr-2"></i>
            About
          </a>
          <a href="#" className="text-sm text-[#d1d0c5] hover:underline">
            <i className="fas fa-cog mr-2"></i>
            Connect
          </a>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex justify-center space-x-2 mb-8">
              <Button
                variant={selectedTab === 'text' ? 'default' : 'secondary'}
                onClick={() => setSelectedTab('text')}
              >
                Text
              </Button>
              <Button
                variant={selectedTab === 'voice' ? 'default' : 'secondary'}
                onClick={() => setSelectedTab('voice')}
              >
                Voice
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center">
              <Input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your text here..."
                className="flex-grow text-2xl p-4 bg-[#2c2e31] border-none text-[#d1d0c5] placeholder-[#646669] focus:outline-none"
              />
              <Button 
                type="submit" 
                className="ml-4 bg-[#e2b714] text-[#323437] hover:bg-[#e2b714]/80"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Send'}
              </Button>
            </div>
          </form>

          {selectedTab === 'text' && response && (
            <div className="mt-8 p-4 bg-[#444648] text-[#d1d0c5] rounded-lg">
              <p>{response}</p>
            </div>
          )}

          {selectedTab === 'voice' && audioSrc && (
            <div className="bg-[#2c2e31] p-6 rounded-lg">
              <audio controls className="w-full" autoPlay>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-[#646669]">
        <p>@ 2024 PAIM. All rights reserved.</p>
      </footer>
    </div>
  );
}