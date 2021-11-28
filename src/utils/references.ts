import fb, { store } from "data/fb";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { IUser } from "types/types";
import { CollectionsName } from "./utils";

export const collectionReferenceProjects = fb.collection(store, CollectionsName.PROJECTS) as CollectionReference<DocumentData>;

export const collectionReferenceUsers = fb.collection(store, CollectionsName.USERS) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) => fb.doc(store, CollectionsName.PROJECTS, id);

export const getDocumentReferenceUsers = (id: string) => fb.doc(store, CollectionsName.USERS, id);

export const getDocumentReference = (collection: string, id: string) => fb.doc(store, collection, id);
