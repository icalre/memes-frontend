import {GuestRoute} from "../components";
import {authRoutes} from "./auth.route.tsx";

export const guestRoute = [
    {
        path: "/",
        element: <GuestRoute />,
        children: [
            ...authRoutes
        ]
    }
];