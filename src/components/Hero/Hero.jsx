import React, { useRef } from "react";
import styles from './Hero.module.css';

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Знайдіть ідеальний автомобіль
                    </h1>
                    <p className={styles.description}>
                        Найбільший вибір вживаних та нових автомобілів в Україні.
                        Перевірені продавці, чесні ціни, швидка угода.
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.buttonPrimary}>
                            Переглянути каталог
                        </button>
                        <button className={styles.buttonSecondary}>
                            Продати авто
                        </button>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <img
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
                        alt="Автомобілі"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;
