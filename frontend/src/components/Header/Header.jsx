import styles from './Header.module.css';
import {Link} from "react-router-dom";

function Header() {
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

                <Link to={"profile"} className={styles.userButton}>
                    <span>👤</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
