import StoreService from "firebase/StoreService";
import { CollectionReference } from "firebase/firestore";
import { IProject, ITeam, IUser } from "types/types";
import { CollectionsName } from "./utils";

export const collectionReferenceProjects = StoreService.collection(
  CollectionsName.projects
) as CollectionReference<IProject>;
export const collectionReferenceTeams = StoreService.collection(
  CollectionsName.teams
) as CollectionReference<ITeam>;

export const collectionReferenceUsers = StoreService.collection(
  CollectionsName.users
) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) =>
  StoreService.doc(CollectionsName.projects, id);

export const getDocumentReferenceUsers = (id: string) =>
  StoreService.doc(CollectionsName.users, id);

export const getDocumentReference = (collection: string, id: string) =>
  StoreService.doc(collection, id);
