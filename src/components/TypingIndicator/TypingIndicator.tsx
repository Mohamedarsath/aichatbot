import styles from './TypingIndicator.module.css'

export const TypingIndicator = () => {
    return (
        <div className={styles.container}>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
        </div>
    )
}
