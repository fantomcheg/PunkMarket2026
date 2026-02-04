import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard/ProductCard';
import FilterPanel, { FilterState } from '@/components/FilterPanel/FilterPanel';
import { products } from '@/data/products';
import styles from '@/styles/Category.module.css';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { id, subcategory } = router.query;
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceMin: 0,
    priceMax: 200000,
    rating: 0,
    inStock: false,
    hasDiscount: false,
    sortBy: 'popular',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !id) {
    return (
      <div className="page">
        <Header />
        <main className={styles.main}>
          <div className="container">
            <p>Загрузка...</p>
          </div>
        </main>
      </div>
    );
  }

  const categoryNames: Record<string, string> = {
    '1': 'Электроника',
    '2': 'Компьютеры',
    '3': 'Бытовая техника',
    '4': 'Одежда',
    '5': 'Обувь',
    '6': 'Дом и сад',
    '7': 'Детские товары',
    '8': 'Красота и здоровье',
    '9': 'Спорт и отдых',
    '10': 'Продукты',
    '11': 'Зоотовары',
    '12': 'Книги',
    '13': 'Авто и мото',
    '14': 'Мебель',
    '15': 'Игры и консоли',
    '16': 'Хобби',
  };

  const categoryName = categoryNames[id as string] || 'Категория';
  const displayName = subcategory ? `${categoryName} → ${subcategory}` : categoryName;

  const filteredProducts = products.filter(p => {
    const categoryMatch = p.categoryId === Number(id);
    
    // Фильтрация по подкатегории
    let subcategoryMatch = true;
    if (subcategory && typeof subcategory === 'string') {
      const subLower = subcategory.toLowerCase();
      const titleLower = p.title.toLowerCase();
      
      // ЭЛЕКТРОНИКА (categoryId: 1)
      if (subLower.includes('смартфон')) {
        subcategoryMatch = titleLower.includes('смартфон') || titleLower.includes('iphone');
      } else if (subLower.includes('планшет')) {
        subcategoryMatch = titleLower.includes('планшет') || titleLower.includes('ipad') || titleLower.includes('tablet');
      } else if (subLower.includes('умные часы')) {
        subcategoryMatch = titleLower.includes('часы') || titleLower.includes('watch') || titleLower.includes('браслет');
      } else if (subLower.includes('наушники')) {
        subcategoryMatch = titleLower.includes('наушни') || titleLower.includes('airpods') || titleLower.includes('tws');
      } else if (subLower.includes('аудио')) {
        subcategoryMatch = titleLower.includes('колонк') || titleLower.includes('аудио') || titleLower.includes('speaker');
      } else if (subLower.includes('фото') || subLower.includes('видео')) {
        subcategoryMatch = titleLower.includes('камер') || titleLower.includes('фото') || titleLower.includes('видео');
      }
      
      // КОМПЬЮТЕРЫ (categoryId: 2)
      else if (subLower.includes('ноутбук')) {
        subcategoryMatch = titleLower.includes('ноутбук') || titleLower.includes('laptop');
      } else if (subLower === 'компьютеры') {
        subcategoryMatch = titleLower.includes('пк') || titleLower.includes('системный блок') || titleLower.includes('desktop');
      } else if (subLower.includes('монитор')) {
        subcategoryMatch = titleLower.includes('монитор') || titleLower.includes('дисплей');
      } else if (subLower.includes('комплектующие')) {
        subcategoryMatch = titleLower.includes('процессор') || titleLower.includes('видеокарт') || 
                          titleLower.includes('память') || titleLower.includes('ssd') || 
                          titleLower.includes('материнск') || titleLower.includes('блок питания');
      } else if (subLower.includes('периферия')) {
        subcategoryMatch = titleLower.includes('клавиатур') || titleLower.includes('мышь') || 
                          titleLower.includes('веб-камера') || titleLower.includes('микрофон');
      } else if (subLower.includes('сетевое')) {
        subcategoryMatch = titleLower.includes('роутер') || titleLower.includes('switch') || 
                          titleLower.includes('модем') || titleLower.includes('wifi');
      }
      
      // БЫТОВАЯ ТЕХНИКА (categoryId: 3)
      else if (subLower.includes('крупная техника')) {
        subcategoryMatch = titleLower.includes('холодильник') || titleLower.includes('стиральн') || 
                          titleLower.includes('посудомоечн') || titleLower.includes('духов');
      } else if (subLower.includes('мелкая техника')) {
        subcategoryMatch = titleLower.includes('микроволн') || titleLower.includes('чайник') || 
                          titleLower.includes('тостер') || titleLower.includes('блендер') || 
                          titleLower.includes('миксер') || titleLower.includes('мультиварк') ||
                          titleLower.includes('кофе');
      } else if (subLower.includes('климатическая')) {
        subcategoryMatch = titleLower.includes('вентилятор') || titleLower.includes('обогреват') || 
                          titleLower.includes('увлажнит') || titleLower.includes('кондиционер');
      } else if (subLower.includes('встраиваемая')) {
        subcategoryMatch = titleLower.includes('встраива') || titleLower.includes('варочн');
      }
      
      // ОДЕЖДА (categoryId: 4)
      else if (subLower.includes('мужская одежда')) {
        subcategoryMatch = titleLower.includes('мужск') || titleLower.includes('рубашк') || 
                          titleLower.includes('брюки') || titleLower.includes('джинс');
      } else if (subLower.includes('женская одежда')) {
        subcategoryMatch = titleLower.includes('женск') || titleLower.includes('платье') || 
                          titleLower.includes('блузк') || titleLower.includes('юбк');
      } else if (subLower.includes('детская одежда')) {
        subcategoryMatch = titleLower.includes('детск');
      } else if (subLower === 'обувь' || subLower.includes('обувь')) {
        subcategoryMatch = titleLower.includes('ботинк') || titleLower.includes('кроссовк') || 
                          titleLower.includes('туфли') || titleLower.includes('сапог');
      } else if (subLower.includes('аксессуар')) {
        subcategoryMatch = titleLower.includes('ремень') || titleLower.includes('шарф') || 
                          titleLower.includes('перчатк') || titleLower.includes('шапк');
      }
      
      // СПОРТ (categoryId: 7)
      else if (subLower.includes('фитнес')) {
        subcategoryMatch = titleLower.includes('гантел') || titleLower.includes('коврик') || 
                          titleLower.includes('фитнес');
      } else if (subLower.includes('туризм')) {
        subcategoryMatch = titleLower.includes('палатк') || titleLower.includes('рюкзак') || 
                          titleLower.includes('спальн');
      } else if (subLower.includes('велосипед')) {
        subcategoryMatch = titleLower.includes('велосипед') || titleLower.includes('bike');
      } else if (subLower.includes('самокат')) {
        subcategoryMatch = titleLower.includes('самокат') || titleLower.includes('scooter');
      }
      
      // Для остальных - пытаемся найти по названию
      else {
        subcategoryMatch = titleLower.includes(subLower);
      }
    }
    
    const priceMatch = p.price >= filters.priceMin && p.price <= filters.priceMax;
    const brandMatch = filters.brands.length === 0 || (p.brand && filters.brands.includes(p.brand));
    const ratingMatch = filters.rating === 0 || p.rating >= filters.rating;
    const stockMatch = !filters.inStock || p.inStock;
    const discountMatch = !filters.hasDiscount || (p.oldPrice && p.oldPrice > p.price);
    const searchMatch = !filters.search || 
      p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(filters.search.toLowerCase());
    const sellerMatch = !filters.seller || p.seller === filters.seller;
    
    return categoryMatch && subcategoryMatch && priceMatch && brandMatch && ratingMatch && 
           stockMatch && discountMatch && searchMatch && sellerMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        const discountA = a.discount || 0;
        const discountB = b.discount || 0;
        return discountB - discountA;
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <>
      <Head>
        <title>{categoryName} — купить в OmniMarket с доставкой</title>
        <meta name="description" content={`${categoryName} в интернет-магазине OmniMarket`} />
      </Head>

      <div className="page">
        <Header />
        
        <main className={styles.main}>
          <div className="container">
            <div className={styles.breadcrumbs}>
              <a href="/">Главная</a>
              <span className={styles.separator}>›</span>
              <span>{categoryName}</span>
            </div>

            <h1 className={styles.title}>{displayName}</h1>

            <div className={styles.content}>
              <FilterPanel 
                categoryId={Number(id)} 
                onFilterChange={setFilters}
              />

              <div className={styles.productsSection}>
                <div className={styles.toolbar}>
                  <div className={styles.resultsCount}>
                    Найдено: {sortedProducts.length} товаров
                  </div>
                  <div className={styles.sortSelect}>
                    <select 
                      className={styles.select}
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value as FilterState['sortBy']})}
                    >
                      <option value="popular">По популярности</option>
                      <option value="price-asc">Сначала дешевле</option>
                      <option value="price-desc">Сначала дороже</option>
                      <option value="rating">По рейтингу</option>
                      <option value="discount">По размеру скидки</option>
                    </select>
                  </div>
                </div>

                {sortedProducts.length > 0 ? (
                  <div className={styles.productsGrid}>
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <h2>Товары не найдены</h2>
                    <p>Попробуйте изменить параметры фильтра</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
