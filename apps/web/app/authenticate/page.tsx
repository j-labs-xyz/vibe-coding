'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import axios from 'axios';

export default function AuthenticatePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            // Forward the token to our API callback handler
            // Stytch provider expects the 'req.url' to contain the token. 
            // We can manually trigger the flow by hitting the callback endpoint with the token as a query param.
            // But our callback endpoint is at /api/auth/callback. 
            // Let's redirect there.
            window.location.href = `/api/auth/callback?token=${token}`;
        } else {
            router.push('/auth/signin?error=no_token');
        }
    }, [token, router]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Authenticating...</h2>
                <p className="text-gray-500">Please wait while we log you in.</p>
            </div>
        </div>
    );
}
