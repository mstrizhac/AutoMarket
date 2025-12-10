// src/hooks/useListings.js
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import env from "../env.js";

export const useListings = () => {
    const GET_USER_CARS_ENDPOINT = "api/listing/cars";
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError('Користувач не авторизований');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const decoded = jwtDecode(token);
            const response = await fetch(env.VITE_API_URL + GET_USER_CARS_ENDPOINT + `${decoded.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Помилка сервера: ${response.status}`);
            }

            const data = await response.json();
            setListings(data);
        } catch (err) {
            console.error('Cannot load user cars', err);
            setError(err.message || 'Помилка завантаження оголошень');
            setListings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return { listings, loading, error, refetchListings: fetchCars, setListings };
};