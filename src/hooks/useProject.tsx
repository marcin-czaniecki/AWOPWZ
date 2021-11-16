import { DocumentReference, FirestoreError } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { useParams } from "react-router-dom";
import { IProject } from "types/types";
import { getDocumentReferenceProject } from "utils/firebaseUtils";

interface IProjectContext {
  doc: DocumentReference<IProject>;
  data: Data<IProject, "", ""> | undefined;
  loading: boolean;
  error: FirestoreError | undefined;
}

export const ProjectContext = createContext<IProjectContext>({
  data: undefined,
  loading: false,
  error: undefined,
} as IProjectContext);

export const ProjectProvider = ({ children }: { children: JSX.Element }) => {
  const { id } = useParams();
  const doc = getDocumentReferenceProject(id || "unknown") as DocumentReference<IProject>;
  const [data, loading, error] = useDocumentData<IProject>(doc);
  return <ProjectContext.Provider value={{ doc, data, loading, error }}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw Error("useProject needs to be inside inside ProjectProvider");
  }
  return project;
};
