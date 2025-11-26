import styles from './Header.module.css';
import {Link} from "react-router-dom";

function Header({currentPage}) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="">
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🚗</span>
                        <span className={styles.logoText}>AutoMarket</span>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    <Link to="add-listing" className={styles.navButton}>Додати оголошення</Link>
                    <Link to="about" className={styles.navButton}>Про нас</Link>
                    <Link to="contact" className={styles.navButton}>Контакти</Link>

                </nav>

                {/* Пошук (тільки на головній) */}
                {currentPage === 'home' && (
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Пошук автомобілів..."
                            className={styles.searchInput}
                        />
                    </div>
                )}

                {/* Іконка користувача */}
                <button className={styles.userButton}>
                    <span>👤</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
