import React from 'react';
import styles from './ReviewCard.module.css';
import { Review } from '@/data/reviews';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className={styles.reviewCard} data-xray-id={`review_${review.id}`}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {review.userName.charAt(0)}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>
              {review.userName}
              {review.verified && (
                <span className={styles.verifiedBadge} title="Проверенная покупка">
                  ✓
                </span>
              )}
            </div>
            <div className={styles.date}>{formatDate(review.date)}</div>
          </div>
        </div>
        <div className={styles.rating}>
          {renderStars(review.rating)}
        </div>
      </div>

      <div className={styles.text}>{review.text}</div>

      {review.photos && review.photos.length > 0 && (
        <div className={styles.photos}>
          {review.photos.map((photo, idx) => (
            <img key={idx} src={photo} alt={`Фото ${idx + 1}`} className={styles.photo} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button className={styles.helpfulBtn} data-xray-id={`helpful_${review.id}`}>
          <span className={styles.thumbIcon}>👍</span>
          Полезно ({review.helpful})
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
