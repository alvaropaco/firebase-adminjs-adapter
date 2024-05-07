import { BaseResource } from 'adminjs';
export class Resource extends BaseResource {
    constructor(firestore, model) {
        super();
        this.firestore = firestore;
        this.model = model; // Initialize the model property
    }
    // List all documents in the collection
    async list() {
        try {
            const snapshot = await this.firestore.collection(this.model).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        catch (error) {
            console.error("Error retrieving documents:", error);
            throw error;
        }
    }
    // Create a new document
    async create(params) {
        try {
            const docRef = this.firestore.collection(this.model).doc();
            await docRef.set(params);
            return { id: docRef.id, ...params };
        }
        catch (error) {
            console.error("Error creating new document:", error);
            throw error;
        }
    }
    // Bulk delete (optional)
    async deleteAll() {
        try {
            const snapshot = await this.firestore.collection(this.model).get();
            const batch = this.firestore.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        }
        catch (error) {
            console.error("Error deleting all documents:", error);
            throw error;
        }
    }
    // Optional: Bulk update (not commonly required but can be implemented if needed)
    async updateAll(params) {
        try {
            const snapshot = await this.firestore.collection(this.model).get();
            const batch = this.firestore.batch();
            snapshot.docs.forEach(doc => {
                batch.update(doc.ref, params);
            });
            await batch.commit();
        }
        catch (error) {
            console.error("Error updating all documents:", error);
            throw error;
        }
    }
}
