import {useContext, createContext, useState, useEffect} from "react";
import {UserModel} from "../models";
import {PageLoader} from "../components";

const AuthContext = createContext({
    isAuthenticated: false,
    setAccessToken: (_user: Partial<UserModel>) => {},
    getAccessToken: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<Partial<UserModel> | undefined>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isloading, setIsLoading] = useState(true);

    function setAccessToken(
        user: Partial<UserModel>) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }

    function getAccessToken() {
        return user;
    }

    async function checkAuth() {
        try {
            if (user) {
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                if (user.id) {
                    setUser(user);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAccessToken,
                getAccessToken
            }}
        >
            {isloading ? <PageLoader /> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);