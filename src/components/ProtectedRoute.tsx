import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers";

export const ProtectedRoute = () => {
    const auth = useAuth();

    return (auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />);
}