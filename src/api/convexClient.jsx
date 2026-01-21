import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

// Function to fetch the JWT from your existing auth provider
const fetchAccessToken = async () => {
    // Replace this with your logic to get the JWT from your existing provider
    // e.g., return localStorage.getItem('base44_access_token');
    const token = localStorage.getItem('base44_access_token');
    return token;
};

// Start fetching and refreshing the token
convex.setAuth(fetchAccessToken);

export const convexClient = convex;

export function ConvexClientProvider({ children }) {
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    );
}
