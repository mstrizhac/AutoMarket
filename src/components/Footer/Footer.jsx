import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>AutoMarket</h3>
            <p className={styles.description}>
              Найкращий сервіс для купівлі та продажу автомобілів в Україні
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Контакти</h4>
            <p>📞 +380 44 123 45 67</p>
            <p>📧 info@automarket.ua</p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Години роботи</h4>
            <p>Пн-Пт: 9:00 - 18:00</p>
            <p>Сб-Нд: 10:00 - 16:00</p>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>© 2025 AutoMarket. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
