import { useEffect, useRef } from 'react'
import { MessageBubble } from '../MessageBubble/MessageBubble'
import { TypingIndicator } from '../TypingIndicator/TypingIndicator'
import styles from './ChatWindow.module.css'

interface Message {
    id: string
    role: 'user' | 'model' | 'system'
    text: string
}

interface ChatWindowProps {
    messages: Message[]
    isLoading: boolean
}

export const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    return (
        <div className={styles.chatWindow}>
            <div className={styles.messagesList}>
                {messages.length === 0 && (
                    <div className={styles.emptyState}>
                        <h1>Hi, I'm Gemini.</h1>
                        <p>How can I help you today?</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        role={msg.role}
                        content={msg.text}
                        isLast={index === messages.length - 1}
                    />
                ))}

                {isLoading && <TypingIndicator />}

                <div ref={bottomRef} style={{ height: '1px' }} />
            </div>
        </div>
    )
}
