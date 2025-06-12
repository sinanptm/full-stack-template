import IOAuthService, { OAuthUser } from "@/domain/interfaces/services/IOAuthService";
import * as admin from "firebase-admin";
import { InternalServerError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from "@/config";

export default class OAuhService implements IOAuthService {
  private firebaseAdminApp: admin.app.App;
  private firebaseAuth: admin.auth.Auth;

  constructor() {
    if (!admin.apps.length) {
      try {
        this.firebaseAdminApp = admin.initializeApp({
          credential: admin.credential.cert({
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY,
            projectId: FIREBASE_PROJECT_ID,
          }),
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
      throw new UnauthorizedError(
        "Firebase token verification via Admin SDK failed:",
        error.message || error,
      );
    }
  }
}
