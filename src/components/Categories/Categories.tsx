import React from 'react';
import Link from 'next/link';
import styles from './Categories.module.css';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: '1', name: 'Электроника', icon: '📱' },
  { id: '2', name: 'Компьютеры', icon: '💻' },
  { id: '3', name: 'Бытовая техника', icon: '🔌' },
  { id: '4', name: 'Одежда', icon: '👕' },
  { id: '5', name: 'Обувь', icon: '👟' },
  { id: '6', name: 'Дом и сад', icon: '🏠' },
  { id: '7', name: 'Детские товары', icon: '🧸' },
  { id: '8', name: 'Красота и здоровье', icon: '💄' },
  { id: '9', name: 'Спорт и отдых', icon: '⚽' },
  { id: '10', name: 'Продукты', icon: '🍎' },
  { id: '11', name: 'Зоотовары', icon: '🐕' },
  { id: '12', name: 'Книги', icon: '📚' },
  { id: '13', name: 'Авто и мото', icon: '🚗' },
  { id: '14', name: 'Мебель', icon: '🛋️' },
  { id: '15', name: 'Игры и консоли', icon: '🎮' },
  { id: '16', name: 'Хобби', icon: '🎨' },
];

const Categories: React.FC = () => {
  return (
    <section className={styles.categories}>
      <div className="container">
        <div className={styles.categoriesGrid} data-xray-id="categories_list">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.id}`} 
              key={category.id}
              className={styles.categoryCard}
              data-xray-id={`category_${category.id}`}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
