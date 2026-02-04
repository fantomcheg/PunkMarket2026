import React from 'react';
import styles from './ModeIndicator.module.css';
import type { Mode } from '../ModeSelector';

interface ModeIndicatorProps {
  mode: Mode;
}

const ModeIndicator: React.FC<ModeIndicatorProps> = ({ mode }) => {
  return (
    <div className={`${styles.indicator} ${styles[mode]}`}>
      <div className={styles.glow}></div>
    </div>
  );
};

export default ModeIndicator;
