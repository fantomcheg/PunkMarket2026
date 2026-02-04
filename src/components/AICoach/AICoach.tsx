import React, { useState } from 'react';
import styles from './AICoach.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AICoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Привет! Я AI-Coach от Punkration. Помогу разобраться с уязвимостями и безопасностью. Просто наведи курсор на любой элемент с X-Ray режимом или задай вопрос!',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Отличный вопрос! Для ответа на "${input}" давай разберем это подробнее. Наведи курсор на элемент с X-Ray, и я объясню код и уязвимости. 🔍`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const quickQuestions = [
    '🔍 Что такое SQL Injection?',
    '🛡️ Как защититься от XSS?',
    '🔓 Объясни IDOR уязвимость',
    '⚡ Что такое Race Condition?',
  ];

  return (
    <>
      {/* Кнопка открытия */}
      {!isOpen && (
        <button 
          className={styles.floatingBtn}
          onClick={() => setIsOpen(true)}
        >
          <span className={styles.icon}>🤖</span>
          <span className={styles.label}>AI Coach</span>
        </button>
      )}

      {/* Панель чата */}
      {isOpen && (
        <div className={styles.panel}>
          {/* Заголовок */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.aiIcon}>🤖</span>
              <div>
                <h3 className={styles.title}>AI Coach</h3>
                <p className={styles.status}>
                  <span className={styles.statusDot}></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Сообщения */}
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
                <span className={styles.timestamp}>
                  {msg.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            ))}
          </div>

          {/* Быстрые вопросы */}
          <div className={styles.quickQuestions}>
            {quickQuestions.map((question, i) => (
              <button 
                key={i}
                className={styles.quickBtn}
                onClick={() => setInput(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Ввод */}
          <div className={styles.inputBlock}>
            <textarea
              className={styles.input}
              placeholder="Задай вопрос о безопасности..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={2}
            />
            <button 
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10l16-8-8 16-2-8-6-0z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AICoach;
