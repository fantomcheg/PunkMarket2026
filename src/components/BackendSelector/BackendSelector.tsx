import React, { useState } from 'react';
import styles from './BackendSelector.module.css';

type Backend = 'nodejs' | 'java' | 'php';

interface BackendOption {
  id: Backend;
  name: string;
  icon: string;
  color: string;
  description: string;
  framework: string;
}

const backends: BackendOption[] = [
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    color: '#68A063',
    description: 'JavaScript/TypeScript runtime',
    framework: 'NestJS + Express',
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: '#E76F00',
    description: 'Enterprise-ready platform',
    framework: 'Spring Boot',
  },
  {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    color: '#8892BE',
    description: 'Web development language',
    framework: 'Laravel',
  },
];

interface BackendSelectorProps {
  onChange?: (backend: Backend) => void;
}

const BackendSelector: React.FC<BackendSelectorProps> = ({ onChange }) => {
  const [selected, setSelected] = useState<Backend>('nodejs');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (backend: Backend) => {
    setSelected(backend);
    setIsOpen(false);
    onChange?.(backend);
  };

  const selectedBackend = backends.find(b => b.id === selected)!;

  return (
    <div className={styles.container}>
      {/* Кнопка выбора */}
      <button 
        className={styles.selector}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedInfo}>
          <span className={styles.icon}>{selectedBackend.icon}</span>
          <div className={styles.details}>
            <span className={styles.label}>Backend:</span>
            <span className={styles.name}>{selectedBackend.name}</span>
          </div>
        </div>
        <svg 
          className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <h3 className={styles.dropdownTitle}>Выбери backend стек</h3>
            <p className={styles.dropdownSubtitle}>
              Одинаковый фронтенд, разные уязвимости
            </p>
          </div>

          <div className={styles.options}>
            {backends.map((backend) => (
              <button
                key={backend.id}
                className={`${styles.option} ${selected === backend.id ? styles.active : ''}`}
                onClick={() => handleSelect(backend.id)}
                style={{ '--accent-color': backend.color } as React.CSSProperties}
              >
                <div className={styles.optionHeader}>
                  <span className={styles.optionIcon}>{backend.icon}</span>
                  <div className={styles.optionInfo}>
                    <h4 className={styles.optionName}>{backend.name}</h4>
                    <p className={styles.optionDesc}>{backend.description}</p>
                  </div>
                  {selected === backend.id && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </div>
                <div className={styles.optionFramework}>
                  <span className={styles.frameworkLabel}>Framework:</span>
                  <span className={styles.frameworkName}>{backend.framework}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.dropdownFooter}>
            <p className={styles.footerText}>
              💡 Все бэкенды содержат одинаковые уязвимости для обучения
            </p>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BackendSelector;
