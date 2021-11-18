import fb, { store } from "data/fb";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { IUser } from "types/types";
import { EnumCollectionsName } from "./utils";

export const collectionReferenceProjects = fb.collection(store, EnumCollectionsName.PROJECTS) as CollectionReference<DocumentData>;

export const collectionReferenceUsers = fb.collection(store, EnumCollectionsName.USERS) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) => fb.doc(store, EnumCollectionsName.PROJECTS, id);

export const getDocumentReferenceUsers = (id: string) => fb.doc(store, EnumCollectionsName.USERS, id);

export const getDocumentReference = (collection: string, id: string) => fb.doc(store, collection, id);
