'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
    id: string;
    email: string | null;
    name?: string | null;
    provider: string;
}

interface AuthContextType {
    user: User | null;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Basic session check logic could go here. 
    // For now, since we are using HttpOnly cookies, we rely on server-side checks or an implementation 
    // where we fetch /api/auth/me (not implemented yet, but good practice).
    // For this scaffold, we'll assume state management via local check or implicit.
    // Actually, to make 'logout' work and Update UI, we generally need an endpoint to get the current user.
    // Let's implement a simple user-persistence using a client-side check if we had one.
    // BUT, since we deleted the previous logic, let's keep it simple: 
    // We'll rely on the fact that protected pages (like dashboard) will check session server-side (middleware or layout).
    // This Context provides the logout function.

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            router.push('/auth/signin');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        // Placeholder for session re-hydration
        setIsLoading(false);
    }, []);


    return (
        <AuthContext.Provider value={{ user, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
