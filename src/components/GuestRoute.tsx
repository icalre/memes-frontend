import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers";

export const GuestRoute = () => {
    const auth = useAuth();

    return (auth.isAuthenticated ? <Navigate to="/" /> : <Outlet />);
}