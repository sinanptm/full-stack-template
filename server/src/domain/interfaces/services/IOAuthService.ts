export interface OAuthUser {
    uid: string;
    email: string | null;
    name: string | null;
    picture: string | null;
    email_verified: boolean;
}

export default interface IOAuthService {
    verifyAccessToken(accessToken: string): Promise<OAuthUser | null>;
}