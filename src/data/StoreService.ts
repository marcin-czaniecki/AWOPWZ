import {
  doc,
  updateDoc,
  DocumentReference,
  setDoc,
  WithFieldValue,
  UpdateData,
  deleteDoc,
  arrayUnion,
  DocumentData,
  addDoc,
  CollectionReference,
  collection,
} from "firebase/firestore";
import { createPath } from "utils/utils";
import { store } from "./fb";

class StoreService {
  //Sync collection
  static collectionSync(...pathSegments: string[]) {
    try {
      return collection(store, pathSegments.length > 1 ? createPath(...pathSegments) : pathSegments[0]);
    } catch (e: any) {
      console.log(e);
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  static collectionWithTypeSync<T extends unknown>(...pathSegments: string[]) {
    try {
      return collection(store, createPath(...pathSegments)) as CollectionReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Async collection
  static async collection(...pathSegments: string[]) {
    try {
      return collection(store, createPath(...pathSegments));
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  static async collectionWithType<T extends unknown>(...pathSegments: string[]) {
    try {
      return collection(store, createPath(...pathSegments)) as CollectionReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Sync doc
  static docSync(...pathSegments: string[]) {
    try {
      return doc(store, pathSegments.length > 1 ? createPath(...pathSegments) : pathSegments[0]);
    } catch (e: any) {
      console.log(e);
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  static docWithTypeSync<T extends unknown>(...pathSegments: string[]) {
    try {
      return doc(store, createPath(...pathSegments)) as DocumentReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Async doc
  static async doc(...pathSegments: string[]) {
    try {
      return doc(store, createPath(...pathSegments));
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  static async docWithType<T extends unknown>(...pathSegments: string[]) {
    try {
      return doc(store, createPath(...pathSegments)) as DocumentReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Without doc
  static async arrayPush<T>(FieldValue: string, value: T, doc: DocumentReference<DocumentData>) {
    updateDoc(doc, {
      [FieldValue]: arrayUnion(value),
    });
  }
  static async createDoc<T extends unknown>(data: WithFieldValue<T>, collection: CollectionReference<T>) {
    try {
      return await addDoc<T>(collection, data);
    } catch (error) {
      throw new Error("Nie można utworzyć dokumentu.");
    }
  }
  static async setDoc<T extends unknown>(data: WithFieldValue<T>, doc: DocumentReference<T>) {
    try {
      return await setDoc<T>(doc, data);
    } catch (error) {
      throw new Error("Nie można utworzyć dokumentu.");
    }
  }
  static async updateDoc<T extends unknown>(data: UpdateData<T>, doc: DocumentReference<T>) {
    try {
      updateDoc<T>(doc, data);
    } catch (error) {
      throw new Error("Nie można zaktualizować dokumentu");
    }
  }
  static async removeDoc(doc: DocumentReference) {
    try {
      deleteDoc(doc);
    } catch (error) {
      throw new Error("Nie można usunąć dokumentu.");
    }
  }

  //WithDoc
  /*   static async arrayPush<T>(FieldValue: string, value: T, ...pathSegments: string[]) {
    updateDoc(await this.doc(...pathSegments), {
      [FieldValue]: arrayUnion(value),
    });
  }
  static async createDoc<T extends unknown>(data: WithFieldValue<T>, ...pathSegments: string[]) {
    try {
      setDoc<T>(await this.docWithType<T>(...pathSegments), data);
    } catch (error) {
      throw new Error("Nie można utworzyć dokumentu.");
    }
  }
  static async updateDoc<T extends unknown>(data: UpdateData<T>, ...pathSegments: string[]) {
    try {
      updateDoc<T>(await this.docWithType<T>(...pathSegments), data);
    } catch (error) {
      throw new Error("Nie można zaktualizować dokumentu");
    }
  }
  static async removeDoc(...pathSegments: string[]) {
    try {
      deleteDoc(await this.doc(...pathSegments));
    } catch (error) {
      throw new Error("Nie można usunąć dokumentu.");
    }
  } */
}

export default StoreService;
