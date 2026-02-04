import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard/ProductCard';
import { products } from '@/data/products';
import styles from '@/styles/Search.module.css';

interface SearchPageProps {
  query: string;
  results: any[];
}

export default function SearchPage({ query, results }: SearchPageProps) {
  return (
    <div className="page">
      <Header />
      
      <main className={styles.main}>
        <div className="container">
          <div className={styles.searchHeader}>
            <h1 className={styles.title}>
              {query ? `Результаты поиска: "${query}"` : 'Поиск товаров'}
            </h1>
            <p className={styles.resultsCount}>
              {results.length > 0 ? `Найдено: ${results.length} товаров` : 'Ничего не найдено'}
            </p>
          </div>

          {results.length > 0 ? (
            <div className={styles.productsGrid}>
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : query ? (
            <div className={styles.noResults}>
              <p>По вашему запросу ничего не найдено.</p>
              <p>Попробуйте изменить поисковый запрос.</p>
              <Link href="/" className={styles.backLink}>
                Вернуться на главную
              </Link>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const query = (context.query.q as string) || '';
  
  let results: any[] = [];
  
  if (query) {
    // Поиск по названию товара (регистронезависимый)
    const searchLower = query.toLowerCase();
    results = products.filter(product => 
      product.title.toLowerCase().includes(searchLower)
    );
  }
  
  // Сериализуем результаты, заменяя undefined на null
  const serializedResults = results.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    oldPrice: p.oldPrice || null,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    badge: p.badge || null,
    inStock: p.inStock,
    categoryId: p.categoryId,
    category: p.category,
    brand: p.brand || null,
    color: p.color || null,
    storage: p.storage || null,
    ram: p.ram || null,
    screen: p.screen || null,
    processor: p.processor || null,
    warranty: p.warranty || null,
    seller: p.seller || null,
    discount: p.discount || null,
    description: p.description || null
  }));
  
  return {
    props: {
      query,
      results: serializedResults
    }
  };
}
