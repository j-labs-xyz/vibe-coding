import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-change-it');

export async function middleware(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
    const { pathname } = req.nextUrl;

    let isAuthenticated = false;

    if (session) {
        try {
            await jwtVerify(session, secret);
            isAuthenticated = true;
        } catch (e) {
            // Invalid token
        }
    }

    // Redirect to dashboard if logged in and trying to access auth pages
    if (isAuthenticated && (pathname.startsWith('/auth') || pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Redirect to login if not logged in and trying to access dashboard
    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        const loginUrl = new URL('/auth/signin', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/auth/:path*', '/dashboard/:path*'],
};
