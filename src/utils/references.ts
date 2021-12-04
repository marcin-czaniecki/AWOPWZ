import StoreService from "data/StoreService";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { IUser } from "types/types";
import { CollectionsName } from "./utils";

export const collectionReferenceProjects = StoreService.sync.collection(
  CollectionsName.projects
) as CollectionReference<DocumentData>;
export const collectionReferenceTeams = StoreService.sync.collection(
  CollectionsName.teams
) as CollectionReference<DocumentData>;

export const collectionReferenceUsers = StoreService.sync.collection(
  CollectionsName.users
) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) =>
  StoreService.sync.doc(CollectionsName.projects, id);

export const getDocumentReferenceUsers = (id: string) =>
  StoreService.sync.doc(CollectionsName.users, id);

export const getDocumentReference = (collection: string, id: string) =>
  StoreService.sync.doc(collection, id);
