import StoreService from "data/StoreService";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { IUser } from "types/types";
import { CollectionsName } from "./utils";

export const collectionReferenceProjects = StoreService.sync.collection(CollectionsName.PROJECTS) as CollectionReference<DocumentData>;

export const collectionReferenceUsers = StoreService.sync.collection( CollectionsName.USERS) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) => StoreService.sync.doc( CollectionsName.PROJECTS, id);

export const getDocumentReferenceUsers = (id: string) => StoreService.sync.doc( CollectionsName.USERS, id);

export const getDocumentReference = (collection: string, id: string) => StoreService.sync.doc( collection, id);
