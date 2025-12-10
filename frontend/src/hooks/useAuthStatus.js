import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import env from "../env.js";

export const useAuthStatus = () => {
    const VERIFY_ENDPOINT = "api/users/verify";
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setIsAuth(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;

                if (decoded.exp && decoded.exp < now) {
                    console.warn("JWT expired (client check).");
                    setIsAuth(false);
                    return;
                }
            } catch (e) {
                console.warn("Invalid JWT (decoding error).");
                setIsAuth(false);
                return;
            }

            try {
                const res = await fetch(env.VITE_API_URL + VERIFY_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsAuth(res.ok);
            } catch (e) {
                console.error("Server verification failed:", e);
                setIsAuth(false);
            }
        };

        verifyToken();
    }, []);

    return { isAuth };
};