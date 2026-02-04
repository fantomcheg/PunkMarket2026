import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Categories from '@/components/Categories';
import PromoBanner from '@/components/PromoBanner';
import ProductCard from '@/components/ProductCard/ProductCard';
import AICoach from '@/components/AICoach';
import styles from '@/styles/Home.module.css';
import { products } from '@/data/products';

export default function Home() {
  return (
    <>
      <Head>
        <title>OmniMarket — интернет-магазин. Миллионы товаров по выгодным ценам</title>
        <meta name="description" content="OmniMarket — покупайте технику, электронику, гаджеты с доставкой по всей России" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        <Header />
        
        <Categories />

        <main className={styles.main}>
          <div className="container">
            {/* Главный баннер */}
            <PromoBanner type="main" />

            {/* Вторичные баннеры (Premium, Карта, Акции) */}
            <PromoBanner type="secondary" />

            {/* Маленькие баннеры по категориям */}
            <PromoBanner type="small" />

            {/* Топ продаж */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Топ продаж</h2>
                <a href="#" className={styles.sectionLink}>Смотреть все →</a>
              </div>
              
              <div className={styles.productsGrid} data-xray-id="top_products">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Смартфоны и гаджеты */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Смартфоны и гаджеты</h2>
                <a href="#" className={styles.sectionLink}>Все смартфоны →</a>
              </div>
              
              <div className={styles.productsGrid} data-xray-id="smartphones">
                {products.slice(8, 16).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Ноутбуки и компьютеры */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Ноутбуки и компьютеры</h2>
                <a href="#" className={styles.sectionLink}>Все ноутбуки →</a>
              </div>
              
              <div className={styles.productsGrid} data-xray-id="laptops">
                {products.slice(16, 24).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Преимущества */}
            <section className={styles.advantages}>
              <div className={styles.advantagesGrid}>
                <div className={styles.advantageCard}>
                  <div className={styles.advantageIcon}>🚚</div>
                  <h3 className={styles.advantageTitle}>Доставка по всей России</h3>
                  <p className={styles.advantageText}>От 1 дня. Бесплатно от 3000₽</p>
                </div>
                <div className={styles.advantageCard}>
                  <div className={styles.advantageIcon}>💳</div>
                  <h3 className={styles.advantageTitle}>Безопасная оплата</h3>
                  <p className={styles.advantageText}>Картой, наличными или в кредит</p>
                </div>
                <div className={styles.advantageCard}>
                  <div className={styles.advantageIcon}>↩️</div>
                  <h3 className={styles.advantageTitle}>Возврат товара</h3>
                  <p className={styles.advantageText}>В течение 14 дней без объяснения причин</p>
                </div>
                <div className={styles.advantageCard}>
                  <div className={styles.advantageIcon}>🎁</div>
                  <h3 className={styles.advantageTitle}>Бонусы и акции</h3>
                  <p className={styles.advantageText}>Кешбэк баллами до 10% от покупки</p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Футер */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerContent}>
              <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Покупателям</h3>
                <ul className={styles.footerList}>
                  <li>Как сделать заказ</li>
                  <li>Способы оплаты</li>
                  <li>Доставка</li>
                  <li>Возврат товара</li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Компания</h3>
                <ul className={styles.footerList}>
                  <li>О нас</li>
                  <li>Контакты</li>
                  <li>Вакансии</li>
                  <li>Пресс-центр</li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Партнёрам</h3>
                <ul className={styles.footerList}>
                  <li>Продавайте на OmniMarket</li>
                  <li>Партнёрская программа</li>
                  <li>Пункты выдачи</li>
                  <li>Реклама</li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h3 className={styles.footerTitle}>Служба поддержки</h3>
                <ul className={styles.footerList}>
                  <li>8 800 234 56 78</li>
                  <li>support@omnimarket.ru</li>
                  <li>Ежедневно 9:00 — 21:00</li>
                  <li>Написать в чат</li>
                </ul>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>© 2025 OmniMarket. Все права защищены.</p>
            </div>
          </div>
        </footer>

        {/* AI Coach (скрыт для реалистичности, но работает) */}
        <AICoach />
      </div>
    </>
  );
}
