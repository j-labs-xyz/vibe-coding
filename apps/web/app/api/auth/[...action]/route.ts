import { NextRequest, NextResponse } from 'next/server';
import { AuthFactory } from '@/lib/auth/factory';
import { createSession, logoutSession } from '@/lib/auth/session';

export async function POST(req: NextRequest, props: { params: Promise<{ action: string[] }> }) {
    const params = await props.params;
    const [action] = params.action;
    const provider = AuthFactory.getProvider();

    try {
        const body = await req.json();

        if (action === 'login') {
            const result = await provider.login(body);
            return NextResponse.json(result);
        }

        if (action === 'signup') {
            const result = await provider.signup(body);
            return NextResponse.json(result);
        }

        if (action === 'logout') {
            await provider.logout();
            await logoutSession();
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest, props: { params: Promise<{ action: string[] }> }) {
    const params = await props.params;
    const [action] = params.action;
    const provider = AuthFactory.getProvider();

    if (action === 'callback') {
        try {
            const user = await provider.callback(req as any); // Type cast for now
            if (user && user.email) {
                await createSession(user.id, user.email);
            }
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } catch (error) {
            console.error('Callback error:', error);
            return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', req.url));
        }
    }

    if (action === 'logout') {
        await provider.logout();
        await logoutSession();
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
