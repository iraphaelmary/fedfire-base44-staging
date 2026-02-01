import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const convex = useConvex();

    const currentUser = useQuery(api.users.viewer, { token: token ?? undefined });

    useEffect(() => {
        if (token && currentUser === null) {
            // Stale token! Wipe it.
            console.log("👋 Stale session detected, logging out...");
            localStorage.removeItem("authToken");
            setToken(null);
            setUser(null);
            setLoading(false);
        } else if (token && currentUser) {
            setUser(currentUser);
            setLoading(false);
        } else if (!token) {
            setUser(null);
            setLoading(false);
        }
    }, [token, currentUser]);

    const login = (newToken) => {
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };

    const logout = async () => {
        if (token) {
            // optimistically clear
            localStorage.removeItem("authToken");
            setToken(null);
            // notify backend
            try {
                await convex.mutation(api.auth_custom.signOut, { token });
            } catch (e) {
                console.error("Logout failed", e);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
