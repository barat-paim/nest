'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState(''); // User input for the prompt
  const [response, setResponse] = useState(''); // Text response from OpenAI
  const [audioSrc, setAudioSrc] = useState(''); // Audio source for voice response
  const [selectedTab, setSelectedTab] = useState('text'); // Track whether user selects text or voice response
  const [loading, setLoading] = useState(false); // Loading state to show spinner or feedback

  useEffect(() => {
     console.log("audio source: ", audioSrc);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      {/* Tabs for Text and Voice Response */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 rounded-lg ${selectedTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setSelectedTab('text')}
        >
          Text
        </button>
        <button
          className={`p-2 rounded-lg ${selectedTab === 'voice' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setSelectedTab('voice')}
        >
          Voice
        </button>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Type your prompt here..." 
          className="w-full text-center p-4 text-gray-400 border border-gray-500 bg-neutral-700 rounded-lg text-lg focus:outline-none"
          style={{ fontSize: '24px', width: '400px' }}
        />
        <button 
          type="submit" 
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>

      {/* Text Response Display */}
      {selectedTab === 'text' && response && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
          <p>{response}</p>
        </div>
      )}

      {/* Audio Player for Voice Response */}
      {selectedTab === 'voice' && audioSrc && (
        <div className="mt-4">
          <audio controls autoPlay>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}