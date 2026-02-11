import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';
import { motion } from 'framer-motion';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
            </button>
        </div>
    );
};
