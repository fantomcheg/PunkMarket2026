import React from 'react';
import styles from './XRayToggle.module.css';

interface XRayToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

const XRayToggle: React.FC<XRayToggleProps> = ({ isActive, onToggle }) => {
  return (
    <button 
      className={`${styles.toggle} ${isActive ? styles.active : ''}`}
      onClick={onToggle}
      title={isActive ? 'Выключить X-Ray' : 'Включить X-Ray'}
    >
      <div className={styles.iconWrapper}>
        <svg 
          className={styles.icon} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {isActive ? (
            // Открытый глаз
            <>
              <path 
                d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <circle 
                cx="12" 
                cy="12.5" 
                r="3.5" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <circle 
                cx="12" 
                cy="12.5" 
                r="1.5" 
                fill="currentColor"
              />
            </>
          ) : (
            // Закрытый глаз
            <>
              <path 
                d="M12 5C7 5 2.73 8.11 1 12.5c.35.89.79 1.73 1.29 2.5M19.5 15c.7-.77 1.29-1.61 1.5-2.5C19.27 8.11 15 5 12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M3 3l18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <path 
                d="M9.9 9.9a3.5 3.5 0 004.2 4.2" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </div>
      <div className={styles.label}>
        <span className={styles.labelText}>X-Ray</span>
        <span className={styles.status}>{isActive ? 'ON' : 'OFF'}</span>
      </div>
    </button>
  );
};

export default XRayToggle;
