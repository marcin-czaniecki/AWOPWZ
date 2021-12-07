import StoreService from "data/StoreService";
import { CollectionReference } from "firebase/firestore";
import { IProject, ITeam, IUser } from "types/types";
import { CollectionsName } from "./utils";

export const collectionReferenceProjects = StoreService.sync.collection(
  CollectionsName.projects
) as CollectionReference<IProject>;
export const collectionReferenceTeams = StoreService.sync.collection(
  CollectionsName.teams
) as CollectionReference<ITeam>;

export const collectionReferenceUsers = StoreService.sync.collection(
  CollectionsName.users
) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) =>
  StoreService.sync.doc(CollectionsName.projects, id);

export const getDocumentReferenceUsers = (id: string) =>
  StoreService.sync.doc(CollectionsName.users, id);

export const getDocumentReference = (collection: string, id: string) =>
  StoreService.sync.doc(collection, id);
