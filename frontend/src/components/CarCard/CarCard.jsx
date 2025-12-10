import styles from './CarCard.module.css';

function CarCard({ car, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(car)}>
      <div className={styles.imageContainer}>
        <img src={car.photos[0]} alt={car.title} className={styles.image} />
        <span className={`${styles.badge} ${
          car.condition === 'New' ? styles.badgeNew : styles.badgeUsed
        }`}>
          {car.condition}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{car.name}</h3>
        <p className={styles.price}>€{car.price}</p>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📅</span>
            <span>{car.year} рік</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>⚡</span>
            <span>{car.mileage} км</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>⛽</span>
            <span>{car.fuel}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📍</span>
            <span>{car.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
