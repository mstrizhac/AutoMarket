import {useEffect, useRef, useState} from 'react';
import Hero from '../../components/Hero/Hero.jsx';
import SearchFilters from '../../components/SearchFilters/SearchFilters.jsx';
import CarCard from '../../components/CarCard/CarCard.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import {cars} from '../../data/cars.js';
import styles from './Home.module.css';
import env from "../../env.js";
import {useCars} from "../../hooks/useCars.js";

export default function Home() {
    const targetRef = useRef(null);

    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cars, loading, error } = useCars();

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    const scrollToTarget = () => {
        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <div>
            <Hero scrollToCatalog={scrollToTarget} />

            <main className={styles.main}>
                <div ref={targetRef} className={styles.catalogSection}>
                    <div className={styles.catalogHeader}>
                        <h2 className={styles.catalogTitle}>Популярні оголошення</h2>
                        <span className={styles.catalogCount}>Знайдено {cars.length} автомобілів</span>
                    </div>

                    <div id={"cars"} className={styles.carGrid}>
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} onClick={handleCarClick}/>
                        ))}
                    </div>
                </div>
            </main>

            {selectedCar &&
                <Modal car={selectedCar} isOpen={isModalOpen} onClose={handleCloseModal}/>
            }
        </div>
    );
}
