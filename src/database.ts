import { BaseDatabase } from 'adminjs';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

export class Database extends BaseDatabase {
  private firestore: admin.firestore.Firestore;

  constructor(serviceAccount: ServiceAccount) {
    super('firestore');
    if (!admin.apps.length) { // Initialize the app only if no other app has been initialized
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }

  static isAdapterFor(database: any): boolean {
    return database instanceof Database;
  }
}
