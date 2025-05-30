import IOAuthService, { OAuthUser } from "@/domain/interfaces/services/IOAuthService";
import * as admin from 'firebase-admin';
import { InternalServerError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { FIRE_BASE_CLIENT_EMAIL, FIRE_BASE_PRIVATE_KEY, FIRE_BASE_PROJECT_ID } from "@/config";

export default class FirebaseService implements IOAuthService {
    private firebaseAdminApp: admin.app.App;
    private firebaseAuth: admin.auth.Auth;

    constructor() {
        if (!admin.apps.length) {
            try {
                this.firebaseAdminApp = admin.initializeApp({
                    credential: admin.credential.cert({
                        clientEmail: FIRE_BASE_CLIENT_EMAIL,
                        privateKey: FIRE_BASE_PRIVATE_KEY,
                        projectId: FIRE_BASE_PROJECT_ID
                    })
                });
            } catch (error) {
                throw new InternalServerError(`Firebase Admin SDK initialization failed: ${error}`);
            }
        } else {
            this.firebaseAdminApp = admin.app();
        }
        this.firebaseAuth = this.firebaseAdminApp.auth();
    }

    async verifyAccessToken(accessToken: string): Promise<OAuthUser | null> {
        try {

            const decodedToken = await this.firebaseAuth.verifyIdToken(accessToken);


            return {
                uid: decodedToken.uid,
                email: decodedToken.email || null,
                name: decodedToken.name || null,
                picture: decodedToken.picture || null,
                email_verified: decodedToken.email_verified || false
            };
        } catch (error: any) {
            if (error.code === 'auth/id-token-expired') {
                throw new UnauthorizedError("Firebase token verification failed: Token expired.");
            } else if (error.code === 'auth/id-token-revoked') {
                throw new UnauthorizedError("Firebase token verification failed: Token revoked.");
            } else if (error.code === 'auth/invalid-id-token') {
                throw new UnauthorizedError("Firebase token verification failed: Invalid token format or signature.");
            } else if (error.code === 'auth/user-disabled') {
                throw new UnauthorizedError("Firebase token verification failed: User account disabled.");
            } else if (error.code === 'auth/user-not-found') {
                throw new UnauthorizedError("Firebase token verification failed: User not found.");
            } else {
                throw new UnauthorizedError("Firebase token verification via Admin SDK failed:", error.message || error);
            }
        }
    }
}