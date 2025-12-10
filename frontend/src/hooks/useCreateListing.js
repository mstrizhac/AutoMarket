import { useState } from 'react';
import env from "../env.js";

export const useCreateListing = () => {
    const ADD_CAR_ENDPOINT = "api/listing/add-car";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const publishListing = async (carData, images) => {
        setLoading(true);
        setError(null);

        try {
            let formData = new FormData();
            formData.append("name", carData.title);
            formData.append("price", carData.price);
            formData.append("mileage", carData.mileage);
            formData.append("year", carData.year);
            formData.append("fuel", carData.fuelType);
            formData.append("city", carData.city);
            formData.append("description", carData.description);
            formData.append("condition", carData.condition);
            formData.append("transmission", carData.transmission);

            images.forEach((image) => {
                formData.append("photos", image.file);
            });

            const response = await fetch(env.VITE_API_URL + ADD_CAR_ENDPOINT, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Помилка: ${response.status}`);
            }
            return true;

        } catch (err) {
            setError(err.message);
            console.error('Error during listing publication:', err);
            alert(`Помилка публікації: ${err.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { publishListing, loading, error };
};