export interface OAuthUser {
  email: string | null;
  name: string | null;
  profile: string | null;
}

export default interface IOAuthService {
  verifyAccessToken(accessToken: string): Promise<OAuthUser | null>;
}
