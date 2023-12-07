import {Meme, Show} from "../pages";

export const memeRoutes = [
    {
        path: "/",
        element: <Meme />,
    },
    {
        path: "/:id",
        element: <Show />,
    }
];