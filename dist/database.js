import { BaseDatabase } from 'adminjs';
import * as admin from 'firebase-admin';
export class Database extends BaseDatabase {
    constructor(serviceAccount) {
        super('firestore');
        if (!admin.apps.length) { // Initialize the app only if no other app has been initialized
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
        this.firestore = admin.firestore();
    }
    getFirestore() {
        return this.firestore;
    }
    static isAdapterFor(database) {
        return database instanceof Database;
    }
}
