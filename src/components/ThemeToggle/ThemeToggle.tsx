import React, { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

export type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  onThemeChange?: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Загружаем тему из localStorage при монтировании
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    onThemeChange?.(newTheme);
  };

  // Не рендерим до монтирования, чтобы избежать гидратации
  if (!mounted) {
    return (
      <button className={styles.toggle} disabled>
        <span className={styles.icon}>🌙</span>
      </button>
    );
  }

  return (
    <button 
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
      onClick={toggleTheme}
      title={theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}
    >
      <div className={styles.iconWrapper}>
        {theme === 'light' ? (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <path 
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <path 
              d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <span className={styles.label}>
        {theme === 'light' ? 'Светлая' : 'Тёмная'}
      </span>
    </button>
  );
};

export default ThemeToggle;
