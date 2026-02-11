import { useState, useCallback, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: string
  role: 'user' | 'model' | 'system'
  text: string
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Persist messages whenever they change
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chat_history');
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true)
    setError(null)

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: content
    }
    setMessages(prev => [...prev, userMsg])

    try {
        // Debugging: Check if key exists (don't log the full key for security)
        console.log("Using API Key:", API_KEY ? `Exists (${API_KEY.slice(0, 4)}...)` : "Missing");

        // Initialize Gemini
        if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === '') {
             console.warn("No API Key found.");
             // Mock response for demo purposes if no key provided
             await new Promise(resolve => setTimeout(resolve, 1500));
             const mockResponse = "I can't truly reply without a Gemini API Key. \n\nPlease add your key to the `.env` file to unlock my full potential!";
             
             setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: mockResponse
             }]);
        } else {
             const genAI = new GoogleGenerativeAI(API_KEY);
             const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
             
             // Convert previous context for history-aware chat
             // This is a simplified version; real app should manage token windows
             const history = messages.map(m => ({
                 role: m.role === 'model' ? 'model' : 'user', 
                 parts: [{ text: m.text }]
             }));

             console.log("Sending request to Gemini...");
             const chat = model.startChat({
                 history: history,
             });

             const result = await chat.sendMessage(content);
             const response = await result.response;
             const text = response.text();
             console.log("Received response from Gemini");

             setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: text
             }]);
        }

    } catch (err: any) {
      console.error("FULL ERROR DETAILS:", err);
      // Clean up error message for UI
      let errorMessage = 'Something went wrong';
      if (err.message) errorMessage = `Error: ${err.message}`;
      
      setError(errorMessage)
      setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: `UseChat Error: ${errorMessage}`
      }])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
    error
  }
}
