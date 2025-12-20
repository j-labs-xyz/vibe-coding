import { IAuthProvider } from './interface';
import { Auth0Provider } from './providers/auth0';
import { StytchProvider } from './providers/stytch';

export class AuthFactory {
    static getProvider(): IAuthProvider {
        const provider = process.env.AUTH_PROVIDER?.toLowerCase();

        switch (provider) {
            case 'auth0':
                return new Auth0Provider();
            case 'stytch':
                return new StytchProvider();
            default:
                throw new Error(`Unsupported AUTH_PROVIDER: ${provider}`);
        }
    }
}
