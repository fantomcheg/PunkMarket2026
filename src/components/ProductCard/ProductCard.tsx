import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Вычисляем скидку один раз, чтобы избежать hydration ошибок
  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article 
      className={styles.card}
      data-xray-id={`product_${product.id}`}
    >
      {/* Бейдж */}
      {product.badge && (
        <div className={styles.badge}>{product.badge}</div>
      )}

      {/* Изображение - кликабельное */}
      <Link href={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <img 
            src={product.image} 
            alt={product.title}
            className={styles.image}
          />
        </div>
      </Link>

      {/* Информация */}
      <div className={styles.info}>
        {/* Цена */}
        <div className={styles.priceBlock}>
          <div className={styles.priceRow}>
            <span className={styles.price} suppressHydrationWarning>
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.oldPrice && discount > 0 && (
              <span className={styles.discount} suppressHydrationWarning>
                -{discount}%
              </span>
            )}
          </div>
          {product.oldPrice && (
            <span className={styles.oldPrice} suppressHydrationWarning>
              {product.oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* Рейтинг */}
        <div className={styles.rating}>
          <span className={styles.stars}>⭐</span>
          <span className={styles.ratingValue} suppressHydrationWarning>
            {product.rating.toFixed(1)}
          </span>
          <span className={styles.reviews} suppressHydrationWarning>
            ({product.reviews})
          </span>
        </div>

        {/* Название - кликабельное */}
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>

        {/* Наличие */}
        <div className={styles.stock}>
          {product.inStock ? (
            <span className={styles.inStock}>В наличии</span>
          ) : (
            <span className={styles.outOfStock}>Нет в наличии</span>
          )}
        </div>

        {/* Кнопки действий */}
        <div className={styles.actions}>
          <button 
            className={styles.addToCartBtn}
            data-xray-id={`add_to_cart_${product.id}`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'В корзину' : 'Недоступно'}
          </button>
          
          {product.inStock && (
            <button 
              className={styles.buyNowBtn}
              data-xray-id={`buy_now_${product.id}`}
            >
              Купить в 1 клик
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
