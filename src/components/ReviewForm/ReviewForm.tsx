import React, { useState } from 'react';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  productId: number;
  onSubmit?: (review: any) => void;
  onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || !userName.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setSubmitting(true);

    // Симуляция отправки
    const review = {
      productId,
      userName,
      rating,
      text,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };

    // XSS уязвимость - не санитизируется ввод
    setTimeout(() => {
      console.log('Отправка отзыва:', review);
      alert('Отзыв отправлен! Спасибо за ваше мнение.');
      onSubmit?.(review);
      setSubmitting(false);
      
      // Очищаем форму
      setText('');
      setUserName('');
      setRating(5);
    }, 1000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starRating = i + 1;
      const isFilled = starRating <= (hoveredRating || rating);
      
      return (
        <button
          key={i}
          type="button"
          className={`${styles.star} ${isFilled ? styles.starFilled : ''}`}
          onClick={() => setRating(starRating)}
          onMouseEnter={() => setHoveredRating(starRating)}
          onMouseLeave={() => setHoveredRating(0)}
          data-xray-id={`star_rating_${starRating}`}
        >
          ★
        </button>
      );
    });
  };

  return (
    <div className={styles.reviewForm} data-xray-id="review_form">
      <h3 className={styles.title}>Написать отзыв</h3>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Ваше имя <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Введите ваше имя"
            required
            data-xray-id="review_username"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Оценка <span className={styles.required}>*</span>
          </label>
          <div className={styles.starsContainer}>
            {renderStars()}
            <span className={styles.ratingText}>{rating} из 5</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Отзыв <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Расскажите о своих впечатлениях от товара..."
            rows={6}
            required
            data-xray-id="review_text"
          />
          <div className={styles.hint}>
            Минимум 50 символов. Осталось: {Math.max(0, 50 - text.length)}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting || text.length < 50}
            data-xray-id="review_submit"
          >
            {submitting ? 'Отправка...' : 'Опубликовать отзыв'}
          </button>
          {onCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              Отмена
            </button>
          )}
        </div>
      </form>

      <div className={styles.disclaimer}>
        <p>
          ⚠️ <strong>Внимание:</strong> Отзыв будет опубликован после модерации.
          Запрещено размещать рекламу, спам и оскорбления.
        </p>
      </div>
    </div>
  );
};

export default ReviewForm;
