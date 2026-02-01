import React from 'react';
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { AuthProvider } from "../context/AuthContext";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

export const convexClient = convex;

export function ConvexClientProvider({ children }) {
    return (
        <ConvexProvider client={convex}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ConvexProvider>
    );
}

