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
        // Small timeout to ensure DOM update is complete before scrolling
        const timeoutId = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timeoutId)
    }, [messages, isLoading])

    return (
        <div className={styles.chatWindow}>
            <div className={styles.messagesList}>
                <div className={styles.contentContainer}>
                    {messages.length === 0 && (
                        <div className={styles.emptyState}>
                            <h1>Hi, I'm AI.</h1>
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

                    {/* Invisible element to scroll to */}
                    <div ref={bottomRef} style={{ height: '1px' }} />

                    {isLoading && <TypingIndicator />}
                </div>
            </div>
        </div>
    )
}
