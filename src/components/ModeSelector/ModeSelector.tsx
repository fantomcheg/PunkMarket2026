import React, { useState } from 'react';
import styles from './ModeSelector.module.css';

export type Mode = 'redteam' | 'appsec';

interface ModeSelectorProps {
  onModeChange?: (mode: Mode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeChange }) => {
  const [mode, setMode] = useState<Mode>('redteam');

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modeSwitch}>
        <button
          className={`${styles.modeButton} ${mode === 'redteam' ? styles.active : ''} ${styles.redteam}`}
          onClick={() => handleModeChange('redteam')}
        >
          <span className={styles.icon}>🔴</span>
          <div className={styles.modeInfo}>
            <span className={styles.modeName}>Red Team</span>
            <span className={styles.modeDesc}>Bug Hunter / Pentester</span>
          </div>
        </button>

        <button
          className={`${styles.modeButton} ${mode === 'appsec' ? styles.active : ''} ${styles.appsec}`}
          onClick={() => handleModeChange('appsec')}
        >
          <span className={styles.icon}>🔵</span>
          <div className={styles.modeInfo}>
            <span className={styles.modeName}>AppSec</span>
            <span className={styles.modeDesc}>Secure Developer</span>
          </div>
        </button>
      </div>

      <div className={styles.modeDescription}>
        {mode === 'redteam' ? (
          <p>
            <strong>Red Team:</strong> Найди уязвимости и захвати флаги
          </p>
        ) : (
          <p>
            <strong>AppSec:</strong> Найди, exploit и исправь код
          </p>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;
