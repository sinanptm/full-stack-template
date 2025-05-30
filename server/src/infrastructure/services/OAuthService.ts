import IOAuthService, { OAuthUser } from "@/domain/interfaces/services/IOAuthService";
import * as admin from 'firebase-admin';
import { InternalServerError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { FIRE_BASE_CLIENT_EMAIL, FIRE_BASE_PRIVATE_KEY, FIRE_BASE_PROJECT_ID } from "@/config";

export default class OAuhService implements IOAuthService {
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
                email: decodedToken.email || null,
                name: decodedToken.name || null,
                profile: decodedToken.picture || null,
            };
        } catch (error: any) {
            throw new UnauthorizedError("Firebase token verification via Admin SDK failed:", error.message || error);
        }
    }
}