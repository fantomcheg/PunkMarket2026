import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';
import TopNav from '../TopNav';
import ModeSelector, { Mode } from '../ModeSelector';
import ModeIndicator from '../ModeIndicator';
import BackendSelector from '../BackendSelector';
import ThemeToggle from '../ThemeToggle';
import CatalogMenu from '../CatalogMenu';

interface HeaderProps {
  onSearchChange?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('redteam');
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <ModeIndicator mode={mode} />
      
      {/* Верхняя навигация */}
      <TopNav />
      
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            {/* Логотип */}
            <Link href="/" className={styles.logo}>
              <h1 className={styles.logoText}>
                <span className={styles.logoPunk}>Omni</span>
                <span className={styles.logoMarket}>Market</span>
              </h1>
            </Link>

            {/* Mode Selector (Red Team / AppSec) */}
            <div className={styles.modeSelectorWrapper}>
              <ModeSelector onModeChange={setMode} />
            </div>

            {/* Backend Selector - только для AppSec режима */}
            {mode === 'appsec' && (
              <div className={styles.backendSelectorWrapper}>
                <BackendSelector />
              </div>
            )}

            {/* Theme Toggle */}
            <div className={styles.themeToggleWrapper}>
              <ThemeToggle />
            </div>

            {/* Каталог */}
            <button 
              className={`${styles.catalogBtn} ${catalogOpen ? styles.catalogBtnActive : ''}`}
              onClick={() => setCatalogOpen(!catalogOpen)}
              data-xray-id="catalog_button"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Каталог
            </button>

            {/* Поиск */}
            <div className={styles.searchWrapper} data-xray-id="search_bar">
              <input 
                type="text" 
                className={styles.searchInput}
                placeholder="Искать товары"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                data-xray-id="search_input"
                data-xray-value={searchQuery}
              />
              <button className={styles.searchBtn} onClick={handleSearch}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Навигация справа */}
            <nav className={styles.navRight}>
              <a href="#" className={styles.navLink} data-xray-id="login_button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 18c0-3.5 2.5-6 6-6s6 2.5 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Войти
              </a>
              <a href="#" className={styles.navLink} data-xray-id="orders_link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 3h8l2 9H4l2-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="7" cy="17" r="1.5" fill="currentColor"/>
                  <circle cx="13" cy="17" r="1.5" fill="currentColor"/>
                </svg>
                Заказы
              </a>
              <a href="#" className={styles.navLink} data-xray-id="favorites_link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3.5l2.1 4.2 4.6.7-3.3 3.2.8 4.6L10 14l-4.2 2.2.8-4.6-3.3-3.2 4.6-.7L10 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                Избранное
              </a>
              <a href="#" className={styles.navLink} data-xray-id="cart_link">
                <div className={styles.cartIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3h14l-1.5 9H4.5L3 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="6" cy="17" r="1.5" fill="currentColor"/>
                    <circle cx="14" cy="17" r="1.5" fill="currentColor"/>
                  </svg>
                  <span className={styles.cartBadge}>0</span>
                </div>
                Корзина
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Catalog Menu */}
      <CatalogMenu isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </>
  );
};

export default Header;
