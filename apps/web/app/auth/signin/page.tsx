'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Only used if provider requires it (optional for Stytch)
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            const { url, message } = response.data;

            if (url) {
                // Redirect (e.g. Auth0)
                window.location.href = url;
            } else if (message) {
                // Message (e.g. Stytch Magic Link)
                setMessage(message);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to sign in');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <div className="w-full max-w-md space-y-8 px-4">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Sign in
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            create a new account
                        </Link>
                    </p>
                </div>

                {message ? (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Check your email</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <input
                                    type="email"
                                    required
                                    className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* 
                  Password field is conditionally useful. 
                  Auth0 might use it if we are doing Resource Owner Password Flow (not recommended), 
                  but standard Auth0 usually just redirects. 
                  Stytch is passwordless.
                  Keeping it hidden for now as both Stytch/Auth0 configured here favor redirect/magic link.
                */}
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div>
                            <Button type="submit" className="w-full">
                                Sign in
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
