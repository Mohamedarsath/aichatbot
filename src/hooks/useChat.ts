import { useState, useCallback, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  id: string
  role: 'user' | 'model' | 'system'
  text: string
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: number
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chat_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(() => {
    const saved = localStorage.getItem('current_session_id');
    return saved || null;
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Computed current messages
  const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages || [];

  // Persist sessions
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Persist current session ID
  useEffect(() => {
    if (currentSessionId) {
        localStorage.setItem('current_session_id', currentSessionId);
    } else {
        localStorage.removeItem('current_session_id');
    }
  }, [currentSessionId]);

  // Initialize a session if none exists
  useEffect(() => {
    if (sessions.length === 0 && !currentSessionId) {
        createNewChat();
    } else if (sessions.length > 0 && !currentSessionId) {
        setCurrentSessionId(sessions[0].id);
    }
  }, []);

  const createNewChat = useCallback(() => {
    const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [],
        createdAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }, []);

  const loadChat = useCallback((id: string) => {
    setCurrentSessionId(id);
  }, []);

  const deleteChat = useCallback((id: string, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent triggering loadChat if button is inside item
    setSessions(prev => {
        const filtered = prev.filter(s => s.id !== id);
        if (filtered.length === 0) {
            // If deleting last chat, create a new one immediately
            // We can't call createNewChat here directly due to state update loops often, 
            // but we can handle it in the useEffect or just clear currentSessionId.
             // Simplest approach:
             return [];
        }
        return filtered;
    });
    
    if (currentSessionId === id) {
        setCurrentSessionId(null); // Will trigger useEffect to select another or create new
    }
  }, [currentSessionId]);

  const clearChat = useCallback(() => {
     if (!currentSessionId) return;
     setSessions(prev => prev.map(s => 
        s.id === currentSessionId ? { ...s, messages: [] } : s
     ));
  }, [currentSessionId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentSessionId) return;

    setIsLoading(true)
    setError(null)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: content
    }

    // Optimistic update
    setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
            // Auto-update title if it's "New Chat" and this is first message
            const title = (s.messages.length === 0 && s.title === 'New Chat') 
                ? content.slice(0, 30) + (content.length > 30 ? '...' : '') 
                : s.title;
            return { ...s, title, messages: [...s.messages, userMsg] };
        }
        return s;
    }));

    try {
        if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY === '') {
             await new Promise(resolve => setTimeout(resolve, 1500));
             const mockResponse = "I can't truly reply without a Gemini API Key. \n\nPlease add your key to the `.env` file.";
             
             setSessions(prev => prev.map(s => 
                s.id === currentSessionId ? { ...s, messages: [...s.messages, {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: mockResponse
                }]} : s
             ));
        } else {
             // ... Gemini API logic (simplified for brevity, assume similar structure)
             const genAI = new GoogleGenerativeAI(API_KEY);
             const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
             
             const currentSession = sessions.find(s => s.id === currentSessionId);
             const history = (currentSession?.messages || []).map(m => ({
                 role: m.role === 'model' ? 'model' : 'user', 
                 parts: [{ text: m.text }]
             }));
             history.push({ role: 'user', parts: [{ text: content }]}); // Add current

             const chat = model.startChat({ history: history.slice(0, -1) }); // Don't include current in history init
             const result = await chat.sendMessage(content);
             const response = await result.response;
             const text = response.text();

             setSessions(prev => prev.map(s => 
                s.id === currentSessionId ? { ...s, messages: [...s.messages, {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: text
                }]} : s
             ));
        }

    } catch (err: any) {
      console.error(err);
      let errorMessage = err.message || 'Something went wrong';
      setError(errorMessage)
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId ? { ...s, messages: [...s.messages, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: `Error: ${errorMessage}`
        }]} : s
     ));
    } finally {
      setIsLoading(false)
    }
  }, [sessions, currentSessionId]) // Dependency on sessions is heavy but needed for history access if logic is here

  return {
    messages: currentMessages,
    sendMessage,
    clearChat,
    isLoading,
    error,
    sessions,
    currentSessionId,
    createNewChat,
    loadChat,
    deleteChat
  }
}
