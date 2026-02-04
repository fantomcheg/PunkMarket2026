import React from 'react';
import styles from './XRayPanel.module.css';
import { xrayMetadata } from '@/data/xray-metadata';

interface XRayPanelProps {
  targetId: string | null;
  position: { x: number; y: number };
}

const XRayPanel: React.FC<XRayPanelProps> = ({ targetId, position }) => {
  if (!targetId) return null;

  const data = xrayMetadata[targetId];
  if (!data) return null;

  return (
    <div 
      className={`${styles.panel} xray-panel`}
      style={{
        top: `${position.y + 10}px`,
        left: `${position.x}px`,
      }}
    >
      {/* Простой заголовок */}
      <div className={styles.header}>
        <span className={styles.endpoint}>
          <span className={styles.method}>{data.endpoint.method}</span>
          {data.endpoint.path}
        </span>
      </div>

      {/* Только код */}
      <pre className={styles.code}>
        <code>{data.backend.code}</code>
      </pre>
    </div>
  );
};

export default XRayPanel;
