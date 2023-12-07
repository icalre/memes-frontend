import {createBrowserRouter} from "react-router-dom";
import {guestRoute} from "./guest.routes.tsx";
import {protectedRoute} from "./protected.routes.tsx";

export const router = createBrowserRouter([
    ...protectedRoute,
    ...guestRoute
]);