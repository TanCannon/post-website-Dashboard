// import { createContext, useContext, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

type AuthContextType = {
    //   isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //   const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            await api.post("/admin/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

        // setIsAuthenticated(true);
        navigate("/dashboard");
    };

    const logout = async () => {
        await api.post("/admin/logout");
        // setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        // <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};