import { DocumentReference, FirestoreError } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { useParams } from "react-router-dom";
import { IProject } from "types/types";
import { getDocumentReferenceProject } from "utils/references";

interface IProjectContext {
  doc: DocumentReference<IProject>;
  project: Data<IProject, "", "">;
  loading: boolean;
  error: FirestoreError | undefined;
}

export const ProjectContext = createContext<IProjectContext>({
  project: {},
  loading: false,
  error: undefined,
} as IProjectContext);

export const ProjectProvider = ({ children }: { children: JSX.Element }) => {
  const { id } = useParams();
  const doc = getDocumentReferenceProject(id || "unknown") as DocumentReference<IProject>;
  const [project, loading, error] = useDocumentData<IProject>(doc);

  const data = {} as Data<IProject, "", "">;
  if (!project) {
    data.name = "unknown";
    data.columns = [];
    data.tasks = [];
  }

  return <ProjectContext.Provider value={{ doc, project: project || data, loading, error }}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw Error("useProject needs to be inside inside ProjectProvider");
  }
  return project;
};
