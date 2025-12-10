import { useState } from 'react';
import env from "../env.js";

export const useListingActions = () => {
    const DELETE_CAR_ENDPOINT = "api/listing/delete";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteListing = async (listingId) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Користувач не авторизований.');
            setLoading(false);
            return false;
        }

        try {
            const response = await fetch(env.VITE_API_URL + DELETE_CAR_ENDPOINT + `${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Помилка видалення');
            }
            return true;
        } catch (err) {
            console.error('Error deleting listing:', err);
            setError(err.message);
            alert(`Помилка видалення: ${err.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteListing, loading, error };
};