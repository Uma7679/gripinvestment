import { createContext, useState, useEffect } from "react";
import authService from "../api/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { token, email, role, firstName, lastName }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        if (token) setUser({ token, email, role, firstName, lastName });
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await authService.login(credentials); // res: { token, email, role }
        if (res?.token) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("email", res.email);
            localStorage.setItem("role", res.role);
            // optional: store name if returned by signup/login
            setUser({ token: res.token, email: res.email, role: res.role });
            return true;
        }
        return false;
    };

    const signup = async (userData) => {
        const res = await authService.signup(userData);
        if (res?.token) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("email", res.email);
            localStorage.setItem("role", res.role);
            setUser({ token: res.token, email: res.email, role: res.role });
            return true;
        }
        return false;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
