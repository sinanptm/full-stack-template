export interface FirebaseUser {
    uid: string;
    email: string | null;
    name: string | null;
    picture: string | null;
    email_verified: boolean;
}

export default interface IFirebaseService {
    verifyAccessToken(accessToken: string): Promise<FirebaseUser | null>;
}