import React, { useState } from 'react';
import Link from 'next/link';
import styles from './CatalogMenu.module.css';

interface Category {
  id: number;
  name: string;
  icon: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Электроника',
    icon: '📱',
    subcategories: ['Смартфоны', 'Планшеты', 'Умные часы', 'Наушники', 'Аудио', 'Фото и видео']
  },
  {
    id: 2,
    name: 'Компьютеры',
    icon: '💻',
    subcategories: ['Ноутбуки', 'Компьютеры', 'Мониторы', 'Комплектующие', 'Периферия', 'Сетевое оборудование']
  },
  {
    id: 3,
    name: 'Бытовая техника',
    icon: '🏠',
    subcategories: ['Крупная техника', 'Мелкая техника', 'Климатическая техника', 'Встраиваемая техника']
  },
  {
    id: 4,
    name: 'Одежда и обувь',
    icon: '👕',
    subcategories: ['Мужская одежда', 'Женская одежда', 'Детская одежда', 'Обувь', 'Аксессуары']
  },
  {
    id: 5,
    name: 'Дом и сад',
    icon: '🌿',
    subcategories: ['Мебель', 'Текстиль', 'Освещение', 'Декор', 'Инструменты', 'Сад и огород']
  },
  {
    id: 6,
    name: 'Спорт и отдых',
    icon: '⚽',
    subcategories: ['Фитнес', 'Туризм', 'Велосипеды', 'Самокаты', 'Спортивное питание']
  },
  {
    id: 7,
    name: 'Красота и здоровье',
    icon: '💄',
    subcategories: ['Косметика', 'Парфюмерия', 'Уход за кожей', 'Уход за волосами', 'Медицинские товары']
  },
  {
    id: 8,
    name: 'Детские товары',
    icon: '🧸',
    subcategories: ['Игрушки', 'Детская мебель', 'Коляски', 'Автокресла', 'Питание']
  },
  {
    id: 9,
    name: 'Продукты',
    icon: '🍕',
    subcategories: ['Свежие продукты', 'Бакалея', 'Напитки', 'Деликатесы', 'Здоровое питание']
  },
  {
    id: 10,
    name: 'Зоотовары',
    icon: '🐕',
    subcategories: ['Корм для собак', 'Корм для кошек', 'Наполнители', 'Аксессуары', 'Игрушки']
  },
  {
    id: 11,
    name: 'Книги',
    icon: '📚',
    subcategories: ['Художественная литература', 'Бизнес-книги', 'Комиксы', 'Детская литература']
  },
  {
    id: 12,
    name: 'Авто и мото',
    icon: '🚗',
    subcategories: ['Автозапчасти', 'Масла и жидкости', 'Аксессуары', 'Инструменты', 'Шины и диски']
  }
];

interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CatalogMenu: React.FC<CatalogMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Catalog Menu */}
      <div className={styles.catalogMenu} data-xray-id="catalog_menu">
        <div className={styles.categories}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={`${styles.categoryItem} ${activeCategory === category.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveCategory(category.id)}
              data-xray-id={`category_${category.id}`}
              onClick={onClose}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
              <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Subcategories Panel */}
        {activeCategory && (
          <div className={styles.subcategories}>
            <h3 className={styles.subcategoriesTitle}>
              {categories.find(c => c.id === activeCategory)?.name}
            </h3>
            <div className={styles.subcategoriesGrid}>
              {categories.find(c => c.id === activeCategory)?.subcategories.map((sub, idx) => (
                <Link
                  key={idx}
                  href={`/category/${activeCategory}?subcategory=${encodeURIComponent(sub)}`}
                  className={styles.subcategoryItem}
                  data-xray-id={`subcategory_${activeCategory}_${idx}`}
                  onClick={onClose}
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogMenu;
