import { Firestore } from 'firebase-admin/firestore';
import { Resource } from './resource';

export class Record {
  private resource: Resource;
  private id?: string | null;
  private params: any;
  private firestore: Firestore;

  constructor(resource: Resource, id: string | null, params: any, firestore: Firestore) {
    this.resource = resource;
    this.id = id;
    this.params = params;
    this.firestore = firestore;
  }

  // Save a new record
  async save(): Promise<any> {
    try {
      const docRef = this.firestore.collection(this.resource.model).doc();
      this.id = docRef.id; // Update id with the new document id
      await docRef.set(this.params);
      return { ...this.params, id: this.id };
    } catch (error) {
      console.error("Error saving record:", error);
      throw error;
    }
  }

  // Update an existing record
  async update(): Promise<any> {
    try {
      if (!this.id) throw new Error("Record id is missing for update operation.");
      const docRef = this.firestore.collection(this.resource.model).doc(this.id);
      await docRef.update(this.params);
      return { ...this.params, id: this.id };
    } catch (error) {
      console.error("Error updating record:", error);
      throw error;
    }
  }

  // Delete a record
  async delete(): Promise<void> {
    try {
      if (!this.id) throw new Error("Record id is missing for delete operation.");
      await this.firestore.collection(this.resource.model).doc(this.id).delete();
    } catch (error) {
      console.error("Error deleting record:", error);
      throw error;
    }
  }

  // Find a record by ID
  async findById(): Promise<any> {
    try {
      if (!this.id) throw new Error("Record id is missing for find operation.");
      const doc = await this.firestore.collection(this.resource.model).doc(this.id).get();
      if (!doc.exists) {
        throw new Error("Record not found");
      }
      return doc.data();
    } catch (error) {
      console.error("Error finding record:", error);
      throw error;
    }
  }
}
