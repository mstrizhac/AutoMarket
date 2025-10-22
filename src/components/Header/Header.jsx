import styles from './Header.module.css';

function Header({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Головна' },
    { id: 'add-listing', label: 'Додати оголошення' },
    { id: 'about', label: 'Про нас' },
    { id: 'contact', label: 'Контакти' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo} onClick={() => onNavigate('home')}>
          <span className={styles.logoIcon}>🚗</span>
          <span className={styles.logoText}>AutoMarket</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${styles.navButton} ${
                currentPage === item.id ? styles.navButtonActive : ''
              }`}
            >
              {item.label}
            </button>
          ))}
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
