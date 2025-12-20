export interface LoginCredentials {
    email?: string;
    password?: string;
    redirectTo?: string;
}

export interface AuthUser {
    id: string;
    email: string | null;
    name?: string | null;
    provider: 'stytch' | 'auth0';
}

export interface IAuthProvider {
    login(credentials: LoginCredentials): Promise<{ url: string } | { message: string }>;
    signup(credentials: LoginCredentials): Promise<{ url: string } | { message: string }>;
    callback(req: Request): Promise<AuthUser>;
    getUser(token: string): Promise<AuthUser | null>;
    logout(): Promise<void>;
}
