import { ChatWindow } from './components/ChatWindow/ChatWindow'
import { InputArea } from './components/InputArea/InputArea'
import { useChat } from './hooks/useChat'

function App() {
    const { messages, isLoading, sendMessage } = useChat()

    return (
        <div className="app-container">
            <ChatWindow messages={messages} isLoading={isLoading} />
            <InputArea onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
    )
}

export default App
