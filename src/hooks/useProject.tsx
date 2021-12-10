import { DocumentReference, FirestoreError } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { IProject, IPermissions } from "types/types";
import { getDocumentReferenceProject } from "utils/references";
import { useUser } from "./useUser";

interface IProjectContext {
  doc: DocumentReference<IProject>;
  project: IProject;
  loading: boolean;
  error: FirestoreError | undefined;
  permissions?: IPermissions;
}

export const ProjectContext = createContext<IProjectContext>({
  project: {},
  loading: false,
  error: undefined,
} as IProjectContext);

export const ProjectProvider = ({ children, id }: { children: JSX.Element; id?: string }) => {
  const params = useParams();
  const projectId = id || params?.id || "unknown";
  const doc = getDocumentReferenceProject(projectId) as DocumentReference<IProject>;
  const [project, loading, error] = useDocumentData<IProject>(doc);
  const { dataUser } = useUser();
  const permissions = dataUser?.teams.find((team) => team.id === project?.teamId);

  return (
    <ProjectContext.Provider
      value={{ doc, project: (project || undefined) as IProject, loading, error, permissions }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw Error("useProject needs to be inside inside ProjectProvider");
  }
  return project;
};
