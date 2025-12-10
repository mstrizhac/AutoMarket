import styles from './Modal.module.css';
import {useEffect, useState} from "react";
import env from "../../env.js";

function Modal({car, isOpen, onClose}) {
    const GET_USER_ENDPOINT = "api/users/user";
    const [user, setUser] = useState(null);

    const getUser = async (email) => {
        try {
            const encodedEmail = email

            const response = await fetch(env.VITE_API_URL + GET_USER_ENDPOINT + `${encodedEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 404) {
                throw new Error('User not found');
            }

            if (!response.ok) {
                throw new Error('Server Error');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error.message);
            console.error(error.stack);
            alert(error.message);
        }
    }

    useEffect(() => {
        if (!isOpen || !car) return;
        getUser(car.user).then(r => {
            setUser(r);
        });
    }, []);
    if (!isOpen || !car || !user) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.imageContainer}>
                    <img src={car.photos[0]} alt={car.title} className={styles.image}/>
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
                            <span className={styles.detailValue}>{car.fuel}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Місто:</span>
                            <span className={styles.detailValue}>{car.city}</span>
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
                        <p><strong>Продавець:</strong> {user.name}</p>
                        <p><strong>Телефон:</strong> {user.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
