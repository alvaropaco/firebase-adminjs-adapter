export class Record {
    constructor(resource, id, params, firestore) {
        this.resource = resource;
        this.id = id;
        this.params = params;
        this.firestore = firestore;
    }
    // Save a new record
    async save() {
        try {
            const docRef = this.firestore.collection(this.resource.model).doc();
            this.id = docRef.id; // Update id with the new document id
            await docRef.set(this.params);
            return { ...this.params, id: this.id };
        }
        catch (error) {
            console.error("Error saving record:", error);
            throw error;
        }
    }
    // Update an existing record
    async update() {
        try {
            if (!this.id)
                throw new Error("Record id is missing for update operation.");
            const docRef = this.firestore.collection(this.resource.model).doc(this.id);
            await docRef.update(this.params);
            return { ...this.params, id: this.id };
        }
        catch (error) {
            console.error("Error updating record:", error);
            throw error;
        }
    }
    // Delete a record
    async delete() {
        try {
            if (!this.id)
                throw new Error("Record id is missing for delete operation.");
            await this.firestore.collection(this.resource.model).doc(this.id).delete();
        }
        catch (error) {
            console.error("Error deleting record:", error);
            throw error;
        }
    }
    // Find a record by ID
    async findById() {
        try {
            if (!this.id)
                throw new Error("Record id is missing for find operation.");
            const doc = await this.firestore.collection(this.resource.model).doc(this.id).get();
            if (!doc.exists) {
                throw new Error("Record not found");
            }
            return doc.data();
        }
        catch (error) {
            console.error("Error finding record:", error);
            throw error;
        }
    }
}
