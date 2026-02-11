import styles from './Header.module.css';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Trash2 } from 'lucide-react';

interface HeaderProps {
    onClearChat: () => void;
}

export const Header = ({ onClearChat }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>AI Chatbot</h1>
            <div className={styles.actions}>
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
                <ThemeSwitcher />
            </div>
        </header>
    );
};
