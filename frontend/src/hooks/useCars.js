import { useState, useEffect } from 'react';
import env from "../env.js";

export const useCars = (initialFilters = {}) => {
    const CARS_ENDPOINT = "api/listing/cars";

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    const fetchCars = async () => {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams(filters).toString();
        const url = `${env.VITE_API_URL}${CARS_ENDPOINT}${queryString ? `?${queryString}` : ''}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Помилка сервера: ${response.status}. ${errorText}`);
            }

            const data = await response.json();
            setCars(data);

        } catch (err) {
            console.error('Error loading cars:', err);
            setError(err.message || 'Не вдалося завантажити оголошення');
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [filters]);

    return { cars, loading, error, setFilters, refetch: fetchCars };
};