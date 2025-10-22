import { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CarCard from '../../components/CarCard/CarCard';
import Modal from '../../components/Modal/Modal';
import { cars } from '../../data/cars';
import styles from './Home.module.css';

function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div>
      <Hero />
      
      <main className={styles.main}>
        <SearchFilters />
        
        <div className={styles.catalogSection}>
          <div className={styles.catalogHeader}>
            <h2 className={styles.catalogTitle}>Популярні оголошення</h2>
            <span className={styles.catalogCount}>Знайдено {cars.length} автомобілів</span>
          </div>
          
          <div id={"cars"} className={styles.carGrid}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} onClick={handleCarClick} />
            ))}
          </div>
        </div>
      </main>

      <Modal car={selectedCar} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Home;
