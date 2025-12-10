import {Route, Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import env from "../../env.js";
import {useAuthStatus} from "../../hooks/useAuthStatus.js";

export default function ProtectedRoute({element}) {
    const { isAuth } = useAuthStatus();
    if (isAuth === null) return null;
    return isAuth ? element : <Navigate to="/login" replace/>
}
