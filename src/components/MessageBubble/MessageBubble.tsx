import { useRef, useEffect } from 'react'
import styles from './MessageBubble.module.css'

interface MessageBubbleProps {
    role: 'user' | 'model' | 'system'
    content: string
    isLast?: boolean
}

export const MessageBubble = ({ role, content, isLast }: MessageBubbleProps) => {
    const bubbleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isLast && bubbleRef.current) {
            bubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [isLast])

    return (
        <div
            ref={bubbleRef}
            className={`${styles.container} ${role === 'user' ? styles.user : styles.model} animate-fade-in`}
        >
            <div className={styles.bubble}>
                {content}
            </div>
        </div>
    )
}
