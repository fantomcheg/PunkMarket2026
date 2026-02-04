import React, { useState } from 'react';
import styles from './TopNav.module.css';

const TopNav: React.FC = () => {
  const [city, setCity] = useState('Москва');
  const [language, setLanguage] = useState('RU');

  return (
    <div className={styles.topNav}>
      <div className="container">
        <div className={styles.topNavContent}>
          {/* Левая часть - сервисы и категории */}
          <nav className={styles.navLinks}>
            <a href="#" className={styles.navLink} data-xray-id="omni_fresh">
              Omni fresh
            </a>
            <a href="#" className={styles.navLink} data-xray-id="omni_card">
              Omni Карта
            </a>
            <a href="#" className={styles.navLink} data-xray-id="tickets_hotels">
              Билеты, отели
            </a>
            <a href="#" className={styles.navLink} data-xray-id="for_business">
              Для бизнеса
            </a>
            <span className={styles.separator}>|</span>
            <a href="#" className={styles.navLink} data-xray-id="category_clothes">
              Одежда
            </a>
            <a href="#" className={styles.navLink} data-xray-id="category_electronics">
              Электроника
            </a>
            <a href="#" className={styles.navLink} data-xray-id="category_home">
              Дом и сад
            </a>
            <a href="#" className={styles.navLink} data-xray-id="special_1rub">
              <span className={styles.specialLink}>Товары за 1₽</span>
            </a>
            <a href="#" className={styles.navLink} data-xray-id="certificates">
              Сертификаты
            </a>
          </nav>

          {/* Правая часть - город, адрес, язык */}
          <div className={styles.rightSection}>
            <button 
              className={styles.cityButton} 
              data-xray-id="city_selector"
              onClick={() => {/* XSS через город */}}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.5 1 2.5 3 2.5 5.5C2.5 8.5 7 13 7 13C7 13 11.5 8.5 11.5 5.5C11.5 3 9.5 1 7 1Z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {city}
            </button>

            <button 
              className={styles.addressButton}
              data-xray-id="address_input"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 4L7 1L11 4V11C11 11.5 10.5 12 10 12H4C3.5 12 3 11.5 3 11V4Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5.5 12V7H8.5V12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Укажите адрес
            </button>

            <button 
              className={styles.langButton}
              data-xray-id="language_selector"
              onClick={() => {/* IDOR через смену языка */}}
            >
              {language}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
