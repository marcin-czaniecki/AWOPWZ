import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  UpdateData,
  collection,
  arrayUnion,
  DocumentData,
  WithFieldValue,
  DocumentReference,
  CollectionReference,
  arrayRemove,
} from "firebase/firestore";
import { createPath } from "utils/utils";
import { store } from "./fb";

class StoreService {
  public static sync = class Sync {
    public static collection(...pathSegments: string[]) {
      try {
        return collection(store, pathSegments.length > 1 ? createPath(...pathSegments) : pathSegments[0]);
      } catch (e: any) {
        console.log(e);
        throw new Error("Nie można utworzyć referencji dokumentu.");
      }
    }
    public static collectionWithType<T extends unknown>(...pathSegments: string[]) {
      try {
        return collection(store, createPath(...pathSegments)) as CollectionReference<T>;
      } catch (e: any) {
        throw new Error("Nie można utworzyć referencji dokumentu.");
      }
    }
    public static doc(...pathSegments: string[]) {
      try {
        return doc(store, pathSegments.length > 1 ? createPath(...pathSegments) : pathSegments[0]);
      } catch (e: any) {
        console.log(e);
        throw new Error("Nie można utworzyć referencji dokumentu.");
      }
    }
    public static docWithType<T extends unknown>(...pathSegments: string[]) {
      try {
        return doc(store, createPath(...pathSegments)) as DocumentReference<T>;
      } catch (e: any) {
        throw new Error("Nie można utworzyć referencji dokumentu.");
      }
    }
  };

  //Async collection
  public static async collection(...pathSegments: string[]) {
    try {
      return collection(store, createPath(...pathSegments));
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  public static async collectionWithType<T extends unknown>(...pathSegments: string[]) {
    try {
      return collection(store, createPath(...pathSegments)) as CollectionReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Async doc
  public static async doc(...pathSegments: string[]) {
    try {
      return doc(store, createPath(...pathSegments));
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  public static async docWithType<T extends unknown>(...pathSegments: string[]) {
    try {
      return doc(store, createPath(...pathSegments)) as DocumentReference<T>;
    } catch (e: any) {
      throw new Error("Nie można utworzyć referencji dokumentu.");
    }
  }
  //Without doc
  public static async arrayPush<T>(FieldValue: string, value: T, doc: DocumentReference<DocumentData>) {
    updateDoc(doc, {
      [FieldValue]: arrayUnion(value),
    });
  }

  public static async removeArrayElement<T>(FieldValue: string, oldVersionElements: T[], doc: DocumentReference<DocumentData>) {
    await updateDoc(doc, {
      [FieldValue]: arrayRemove(...oldVersionElements),
    });
  }

  public static async updateArray<T>(
    FieldValue: string,
    oldVersionElements: T[],
    newVersionElements: T[],
    doc: DocumentReference<DocumentData>
  ) {
    await updateDoc(doc, {
      [FieldValue]: arrayRemove(...oldVersionElements),
    });
    await updateDoc(doc, {
      [FieldValue]: arrayUnion(...newVersionElements),
    });
  }

  public static async setArray<T>(FieldValue: string, elements: T[], doc: DocumentReference<DocumentData>) {
    await updateDoc(doc, {
      [FieldValue]: [elements],
    });
  }

  public static async createDoc<T extends unknown>(data: WithFieldValue<T>, collection: CollectionReference<T>) {
    try {
      return await addDoc<T>(collection, data);
    } catch (error) {
      throw new Error("Nie można utworzyć dokumentu.");
    }
  }
  public static async setDoc<T extends unknown>(data: WithFieldValue<T>, doc: DocumentReference<T>) {
    try {
      return await setDoc<T>(doc, data);
    } catch (error) {
      throw new Error("Nie można utworzyć dokumentu.");
    }
  }
  public static async updateDoc<T extends unknown>(data: UpdateData<T>, doc: DocumentReference<T>) {
    try {
      updateDoc<T>(doc, data);
    } catch (error) {
      throw new Error("Nie można zaktualizować dokumentu");
    }
  }
  public static async removeDoc(doc: DocumentReference) {
    try {
      deleteDoc(doc);
    } catch (error) {
      throw new Error("Nie można usunąć dokumentu.");
    }
  }
}

export default StoreService;
