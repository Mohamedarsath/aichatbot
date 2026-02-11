import { ChatWindow } from './components/ChatWindow/ChatWindow'
import { InputArea } from './components/InputArea/InputArea'
import { useChat } from './hooks/useChat'
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components/Header/Header'

function App() {
    const { messages, isLoading, sendMessage, clearChat } = useChat()

    return (
        <ThemeProvider>
            <div className="app-container">
                <Header onClearChat={clearChat} />
                <ChatWindow messages={messages} isLoading={isLoading} />
                <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
            </div>
        </ThemeProvider>
    )
}

export default App
