import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
        user: {
            id: session.userId,
            email: session.email,
            name: session.name || null,
            provider: session.provider || 'stytch', // defaulting if missing from token
        },
    });
}
