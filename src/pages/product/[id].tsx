import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import { products } from '@/data/products';
import { getReviewsForProduct } from '@/data/reviews';
import styles from '@/styles/Product.module.css';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Ждем пока роутер загрузится
  if (!router.isReady) {
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

  const product = products.find(p => p.id === id);
  const reviews = product ? getReviewsForProduct(Number(id)) : [];

  if (!product) {
    return (
      <div className="page">
        <Header />
        <main className={styles.main}>
          <div className="container">
            <h1>Товар не найден</h1>
          </div>
        </main>
      </div>
    );
  }

  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.title} — купить в OmniMarket</title>
        <meta name="description" content={`${product.title} по цене ${product.price.toLocaleString('ru-RU')} ₽. Быстрая доставка, гарантия качества`} />
      </Head>

      <div className="page">
        <Header />

        <main className={styles.main}>
          <div className="container">
            {/* Хлебные крошки */}
            <div className={styles.breadcrumbs}>
              <a href="/">Главная</a>
              <span className={styles.separator}>›</span>
              <span>{product.title}</span>
            </div>

            <div className={styles.productContainer}>
              {/* Левая колонка - изображение */}
              <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.title} className={styles.image} />
                  {product.badge && (
                    <div className={styles.badge}>{product.badge}</div>
                  )}
                </div>
              </div>

              {/* Правая колонка - информация и покупка */}
              <div className={styles.infoSection}>
                <h1 className={styles.title}>{product.title}</h1>

                {/* Рейтинг */}
                <div className={styles.ratingBlock}>
                  <div className={styles.stars}>
                    <span className={styles.starFilled}>★</span>
                    <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className={styles.reviews}>{product.reviews} отзывов</span>
                </div>

                {/* Цена */}
                <div className={styles.priceBlock}>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</span>
                    {discount > 0 && (
                      <span className={styles.discount}>-{discount}%</span>
                    )}
                  </div>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>

                {/* Наличие */}
                <div className={styles.stock}>
                  {product.inStock ? (
                    <span className={styles.inStock}>✓ В наличии</span>
                  ) : (
                    <span className={styles.outOfStock}>Нет в наличии</span>
                  )}
                </div>

                {/* Количество */}
                <div className={styles.quantityBlock}>
                  <label className={styles.quantityLabel}>Количество:</label>
                  <div className={styles.quantitySelector}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={styles.quantityBtn}
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className={styles.quantityInput}
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className={styles.quantityBtn}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Кнопки покупки */}
                <div className={styles.actions}>
                  <button 
                    className={styles.addToCartBtn}
                    disabled={!product.inStock}
                    data-xray-id={`add_to_cart_${product.id}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 3h14l-1.5 9H4.5L3 3z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    В корзину
                  </button>
                  <button 
                    className={styles.buyNowBtn}
                    disabled={!product.inStock}
                    data-xray-id={`buy_now_${product.id}`}
                  >
                    Купить в 1 клик
                  </button>
                </div>
              </div>
            </div>

            {/* Описание товара */}
            {product.description && (
              <section className={styles.descriptionSection}>
                <div className={styles.descriptionContent}>
                  {product.description.split('\n').map((line, index) => (
                    <p key={index} className={styles.descriptionLine}>
                      {line}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Отзывы */}
            <section className={styles.reviewsSection}>
              <div className={styles.reviewsHeader}>
                <h2 className={styles.sectionTitle}>
                  Отзывы покупателей ({reviews.length})
                </h2>
                <button 
                  className={styles.writeReviewBtn}
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  ✍️ Написать отзыв
                </button>
              </div>

              {showReviewForm && (
                <ReviewForm 
                  productId={Number(product.id)}
                  onSubmit={() => setShowReviewForm(false)}
                  onCancel={() => setShowReviewForm(false)}
                />
              )}

              {reviews.length > 0 ? (
                <div className={styles.reviewsList}>
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className={styles.noReviews}>
                  <p>Пока нет отзывов. Будьте первым!</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductPage;
