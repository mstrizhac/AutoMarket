import styles from './Modal.module.css';

function Modal({ car, isOpen, onClose }) {
  if (!isOpen || !car) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.imageContainer}>
          <img src={car.image} alt={car.title} className={styles.image} />
        </div>
        
        <div className={styles.content}>
          <h2 className={styles.title}>{car.title}</h2>
          <p className={styles.price}>€{car.price}</p>
          
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Рік випуску:</span>
              <span className={styles.detailValue}>{car.year}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Пробіг:</span>
              <span className={styles.detailValue}>{car.mileage} км</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Тип палива:</span>
              <span className={styles.detailValue}>{car.fuelType}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Місто:</span>
              <span className={styles.detailValue}>{car.location}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Стан:</span>
              <span className={styles.detailValue}>{car.condition}</span>
            </div>
          </div>
          
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>Опис</h3>
            <p>{car.description}</p>
          </div>
          
          <div className={styles.seller}>
            <h3 className={styles.sectionTitle}>Контактна інформація</h3>
            <p><strong>Продавець:</strong> {car.seller}</p>
            <p><strong>Телефон:</strong> {car.phone}</p>
          </div>
          
          <button className={styles.contactButton}>
            Зв'язатися з продавцем
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
