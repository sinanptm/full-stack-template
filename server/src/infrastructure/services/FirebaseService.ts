import IFirebaseService, { FirebaseUser } from "@/domain/interfaces/services/IFirebaseService";
import { injectable } from "inversify";
import { FIREBASE_PROJECT_ID } from "@/config";

@injectable()
export default class FirebaseService implements IFirebaseService {
    async verifyAccessToken(accessToken: string): Promise<FirebaseUser | null> {
        try {
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
            );

            if (!response.ok) {
                return null;
            }

            const data = await response.json();

            if (data.aud !== FIREBASE_PROJECT_ID) {
                return null;
            }

            return {
                uid: data.sub,
                email: data.email || null,
                name: data.name || null,
                picture: data.picture || null,
                email_verified: data.email_verified
            };
        } catch (error) {
            console.error("Firebase token verification via API failed:", error);
            return null;
        }
    }
}