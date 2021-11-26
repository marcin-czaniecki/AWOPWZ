import { DocumentReference, FirestoreError } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { IProject } from "types/types";
import { getDocumentReferenceProject } from "utils/references";

interface IProjectContext {
  doc: DocumentReference<IProject>;
  project: IProject;
  loading: boolean;
  error: FirestoreError | undefined;
}

export const ProjectContext = createContext<IProjectContext>({
  project: {},
  loading: false,
  error: undefined,
} as IProjectContext);

export const ProjectProvider = ({ children, id }: { children: JSX.Element; id?: string }) => {
  const params = useParams();
  const doc = getDocumentReferenceProject(id || params?.id || "unknown") as DocumentReference<IProject>;
  const [project, loading, error] = useDocumentData<IProject>(doc);

  return (
    <ProjectContext.Provider value={{ doc, project: (project || {}) as IProject, loading, error }}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw Error("useProject needs to be inside inside ProjectProvider");
  }
  return project;
};
