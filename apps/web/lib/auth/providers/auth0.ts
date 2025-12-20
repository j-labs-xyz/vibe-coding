import { IAuthProvider, LoginCredentials, AuthUser } from '../interface';
import { AuthenticationClient } from 'auth0';

export class Auth0Provider implements IAuthProvider {
    private client: AuthenticationClient;

    constructor() {
        this.client = new AuthenticationClient({
            domain: process.env.AUTH0_DOMAIN!,
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
        });
    }

    async login(credentials: LoginCredentials): Promise<{ url: string }> {
        // Standard OAuth Login URL
        const url = `https://${process.env.AUTH0_DOMAIN}/authorize?` +
            `response_type=code&` +
            `client_id=${process.env.AUTH0_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`)}&` +
            `scope=openid profile email`;

        return { url };
    }

    async signup(credentials: LoginCredentials): Promise<{ url: string }> {
        // Auth0 uses the same URL for signup, typically toggled by a param or just the Universal Login UI
        return this.login(credentials);
    }

    async callback(req: Request): Promise<AuthUser> {
        const url = new URL(req.url);
        const code = url.searchParams.get('code');
        if (!code) throw new Error('No code provided');

        const tokenSet = await this.client.oauth.authorizationCodeGrant({
            code,
            redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        });

        const userProfile = await this.client.getProfile(tokenSet.data.access_token);

        return {
            id: userProfile.sub,
            email: userProfile.email || null,
            name: userProfile.name,
            provider: 'auth0',
        };
    }

    async getUser(token: string): Promise<AuthUser | null> {
        try {
            const userProfile = await this.client.getProfile(token);
            return {
                id: userProfile.sub,
                email: userProfile.email || null,
                name: userProfile.name,
                provider: 'auth0',
            };
        } catch (e) {
            return null;
        }
    }

    async logout(): Promise<void> {
        // Client-side logout usually handled by clearing session, 
        // potentially redirect to Auth0 logout endpoint
    }
}
