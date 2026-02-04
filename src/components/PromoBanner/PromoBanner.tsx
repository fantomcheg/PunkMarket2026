import React from 'react';
import Link from 'next/link';
import styles from './PromoBanner.module.css';

interface PromoBannerProps {
  type?: 'main' | 'secondary' | 'small';
}

const PromoBanner: React.FC<PromoBannerProps> = ({ type = 'main' }) => {
  if (type === 'main') {
    return (
      <div className={styles.mainBanner} data-xray-id="promo_banner_main">
        <div className={styles.bannerContent}>
          <div className={styles.bannerLeft}>
            <span className={styles.badge}>🔥 Супер скидки</span>
            <h2 className={styles.bannerTitle}>
              Скидки до 70% на<br />смартфоны и гаджеты
            </h2>
            <p className={styles.bannerSubtitle}>
              Только сегодня! Не упусти свой шанс
            </p>
            <Link href="#" className={styles.bannerButton}>
              Смотреть товары
            </Link>
          </div>
          <div className={styles.bannerRight}>
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop" 
              alt="Супер скидки на смартфоны"
              className={styles.bannerImage}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'secondary') {
    return (
      <div className={styles.secondaryBanners}>
        <div className={styles.secondaryBanner} data-xray-id="promo_banner_1">
          <div className={styles.secondaryContent}>
            <div className={styles.secondaryIcon}>💎</div>
            <div className={styles.secondaryText}>
              <h3 className={styles.secondaryTitle}>Супер цена</h3>
              <p className={styles.secondaryDesc}>Лучшие товары по низким ценам</p>
            </div>
          </div>
        </div>

        <div className={styles.secondaryBanner} data-xray-id="promo_banner_2">
          <div className={styles.secondaryContent}>
            <div className={styles.secondaryIcon}>💳</div>
            <div className={styles.secondaryText}>
              <h3 className={styles.secondaryTitle}>Omni Карта</h3>
              <p className={styles.secondaryDesc}>До 25% кешбэка баллами</p>
            </div>
          </div>
        </div>

        <div className={styles.secondaryBanner} data-xray-id="promo_banner_3">
          <div className={styles.secondaryContent}>
            <div className={styles.secondaryIcon}>🎁</div>
            <div className={styles.secondaryText}>
              <h3 className={styles.secondaryTitle}>Подарки к покупке</h3>
              <p className={styles.secondaryDesc}>При заказе от 5000₽</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.smallBanners}>
      <div className={styles.smallBanner} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className={styles.smallContent}>
          <div className={styles.smallIcon}>📱</div>
          <h4 className={styles.smallTitle}>Смартфоны</h4>
          <p className={styles.smallDesc}>от 4 990₽</p>
        </div>
      </div>

      <div className={styles.smallBanner} style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <div className={styles.smallContent}>
          <div className={styles.smallIcon}>💻</div>
          <h4 className={styles.smallTitle}>Ноутбуки</h4>
          <p className={styles.smallDesc}>от 24 990₽</p>
        </div>
      </div>

      <div className={styles.smallBanner} style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
        <div className={styles.smallContent}>
          <div className={styles.smallIcon}>🎮</div>
          <h4 className={styles.smallTitle}>Консоли</h4>
          <p className={styles.smallDesc}>от 34 990₽</p>
        </div>
      </div>

      <div className={styles.smallBanner} style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
        <div className={styles.smallContent}>
          <div className={styles.smallIcon}>🎧</div>
          <h4 className={styles.smallTitle}>Наушники</h4>
          <p className={styles.smallDesc}>от 990₽</p>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
