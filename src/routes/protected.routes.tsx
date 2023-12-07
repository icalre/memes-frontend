import {ProtectedRoute} from "../components";
import {memeRoutes} from "./meme.route.tsx";

export const protectedRoute = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            ...memeRoutes
        ]
    }
];