import env from "../env.js";

export const useAuth = () => {
    const LOGIN_ENDPOINT = "api/users/login";
    const REGISTER_ENDPOINT = "api/users/register";

    const register = async (userData) => {
        try {
            const response = await fetch(env.VITE_API_URL + REGISTER_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.mail,
                    password: userData.password,
                    name: userData.name,
                    phone: userData.phone,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('accessToken', data.token);
            }
            return true; // Успех

        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
            return false; // Ошибка
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(env.VITE_API_URL + LOGIN_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('accessToken', data.token);
            }
            return true;

        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
            return false;
        }
    };

    return { register, login };
};