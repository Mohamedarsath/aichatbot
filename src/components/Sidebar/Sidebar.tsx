import { Plus, Trash2, MessageSquare } from 'lucide-react'
import { ChatSession } from '../../hooks/useChat'
import styles from './Sidebar.module.css'

interface SidebarProps {
    sessions: ChatSession[]
    currentSessionId: string | null
    onNewChat: () => void
    onLoadChat: (id: string) => void
    onDeleteChat: (id: string, e: React.MouseEvent) => void
    isOpen: boolean
    onClose: () => void
}

export const Sidebar = ({
    sessions,
    currentSessionId,
    onNewChat,
    onLoadChat,
    onDeleteChat,
    isOpen,
    onClose
}: SidebarProps) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && <div className={styles.overlay} onClick={onClose} />}

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <button className={styles.newChatButton} onClick={onNewChat}>
                    <Plus size={16} />
                    New Chat
                </button>

                <div className={styles.sessionList}>
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            className={`${styles.sessionItem} ${session.id === currentSessionId ? styles.active : ''}`}
                            onClick={() => {
                                onLoadChat(session.id);
                                if (window.innerWidth < 768) onClose();
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                <MessageSquare size={14} />
                                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {session.title}
                                </span>
                            </span>

                            <button
                                className={styles.deleteButton}
                                onClick={(e) => onDeleteChat(session.id, e)}
                                title="Delete chat"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
