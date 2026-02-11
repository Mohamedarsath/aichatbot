import styles from './Header.module.css';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Trash2, Menu } from 'lucide-react';

interface HeaderProps {
    onClearChat: () => void;
    onToggleSidebar: () => void;
}

export const Header = ({ onClearChat, onToggleSidebar }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    className={styles.iconButton}
                    onClick={onToggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={20} />
                </button>
                <h1 className={styles.title}>AI Chatbot</h1>
            </div>

            <div className={styles.actions}>
                <ThemeSwitcher />
                <button
                    className={styles.iconButton}
                    onClick={() => {
                        if (window.confirm('Are you sure you want to clear the chat history?')) {
                            onClearChat();
                        }
                    }}
                    title="Clear Chat"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </header>
    );
};
