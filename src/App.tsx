import { useState } from 'react'
import { ChatWindow } from './components/ChatWindow/ChatWindow'
import { InputArea } from './components/InputArea/InputArea'
import { useChat } from './hooks/useChat'
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Menu } from 'lucide-react'

function App() {
    const {
        messages,
        isLoading,
        sendMessage,
        clearChat,
        sessions,
        currentSessionId,
        createNewChat,
        loadChat,
        deleteChat
    } = useChat()

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <ThemeProvider>
            <div className="app-layout">
                <Sidebar
                    sessions={sessions}
                    currentSessionId={currentSessionId}
                    onNewChat={createNewChat}
                    onLoadChat={loadChat}
                    onDeleteChat={deleteChat}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <div className="main-content">
                    <Header
                        onClearChat={clearChat}
                        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    />
                    <ChatWindow messages={messages} isLoading={isLoading} />
                    <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
