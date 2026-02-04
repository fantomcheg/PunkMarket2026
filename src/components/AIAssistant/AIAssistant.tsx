import React, { useState } from 'react';
import styles from './AIAssistant.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я AI-коуч PunkMarket 🤖\n\nЯ помогу тебе:\n• Понять уязвимости\n• Построить эксплойты\n• Научиться безопасному коду\n\nЗадавай вопросы!',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Симуляция ответа AI
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Отличный вопрос! Я вижу, что ты интересуешься безопасностью. Наведи курсор на любой элемент с X-Ray для подробной информации о backend.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        className={styles.openBtn}
        onClick={() => setIsOpen(true)}
        data-xray-id="ai_assistant_toggle"
      >
        <span className={styles.icon}>🤖</span>
        <span>AI-коуч</span>
      </button>
    );
  }

  return (
    <div 
      className={`${styles.assistant} ${isMinimized ? styles.minimized : ''}`}
      data-xray-id="ai_assistant"
    >
      {/* Заголовок */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>🤖</span>
          <div>
            <h3 className={styles.title}>AI-коуч</h3>
            <span className={styles.status}>● Онлайн</span>
          </div>
        </div>
        <div className={styles.headerButtons}>
          <button 
            className={styles.headerBtn}
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Развернуть" : "Свернуть"}
          >
            {isMinimized ? '□' : '_'}
          </button>
          <button 
            className={styles.headerBtn}
            onClick={() => setIsOpen(false)}
            title="Закрыть"
          >
            ×
          </button>
        </div>
      </div>

      {/* Контент */}
      {!isMinimized && (
        <>
          {/* Быстрые кнопки */}
          <div className={styles.quickActions}>
            <button className={styles.quickBtn}>💡 Подсказка</button>
            <button className={styles.quickBtn}>🛡️ Уязвимости</button>
            <button className={styles.quickBtn}>📚 Обучение</button>
          </div>

          {/* Сообщения */}
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                <div className={styles.messageContent}>
                  <p className={styles.messageText}>{msg.text}</p>
                  <span className={styles.messageTime}>
                    {msg.timestamp.toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ввод */}
          <div className={styles.input}>
            <textarea
              className={styles.textarea}
              placeholder="Задай вопрос AI-коучу..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
              disabled={!inputValue.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10l16-8-8 16-2-8-6-2z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;
