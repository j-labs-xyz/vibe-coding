import { IAuthProvider, LoginCredentials, AuthUser } from '../interface';
import * as stytch from 'stytch';

export class StytchProvider implements IAuthProvider {
    private client: stytch.Client;

    constructor() {
        this.client = new stytch.Client({
            project_id: process.env.STYTCH_PROJECT_ID!,
            secret: process.env.STYTCH_SECRET!,
            env: process.env.STYTCH_ENV === 'live' ? stytch.envs.live : stytch.envs.test,
        });
    }

    async login(credentials: LoginCredentials): Promise<{ message: string }> {
        if (!credentials.email) throw new Error('Email is required');

        await this.client.magicLinks.email.loginOrCreate({
            email: credentials.email,
            login_magic_link_url: `${process.env.NEXT_PUBLIC_BASE_URL}/authenticate`,
            signup_magic_link_url: `${process.env.NEXT_PUBLIC_BASE_URL}/authenticate`,
        });

        return { message: 'Magic link sent' };
    }

    async signup(credentials: LoginCredentials): Promise<{ message: string }> {
        return this.login(credentials);
    }

    async callback(req: Request): Promise<AuthUser> {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');
        if (!token) throw new Error('No token provided');

        const resp = await this.client.magicLinks.authenticate({
            token,
            session_duration_minutes: 60,
        });

        return {
            id: resp.user_id,
            email: resp.user.emails[0]?.email || null,
            name: resp.user.name?.first_name ? `${resp.user.name.first_name} ${resp.user.name.last_name}` : null,
            provider: 'stytch',
        };
    }

    async getUser(token: string): Promise<AuthUser | null> {
        // Stytch sessions are opaque tokens or JWTs? 
        // Assuming we use Stytch Sessions
        try {
            const resp = await this.client.sessions.authenticate({
                session_token: token
            });
            return {
                id: resp.user.user_id,
                email: resp.user.emails[0]?.email || null,
                name: resp.user.name?.first_name ? `${resp.user.name.first_name} ${resp.user.name.last_name}` : null,
                provider: 'stytch',
            };
        } catch {
            return null;
        }
    }

    async logout(): Promise<void> {
        // Stytch logout
    }
}
