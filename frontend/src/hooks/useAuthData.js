import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import env from "../env.js";

export const useAuthData = () => {
    const GET_USER_ENDPOINT = "api/users/user";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async (email) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            setError('Користувач не авторизований');
            return null;
        }

        try {
            const response = await fetch(env.VITE_API_URL + GET_USER_ENDPOINT + `${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Помилка сервера: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error.message);
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            setError('Токен не знайдено.');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            getUser(decoded.email).then((userData) => {
                setUser(userData);
            });
        } catch (e) {
            setError('Невірний або прострочений токен.');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { user, loading, error };
};