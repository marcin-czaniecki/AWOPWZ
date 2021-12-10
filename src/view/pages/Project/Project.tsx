import ErrorData from "components/molecules/ErrorData/ErrorData";
import Loading from "components/molecules/Loading/Loading";
import ProjectBoard from "components/organisms/ProjectBoard/ProjectBoard";
import ProjectChat from "components/organisms/ProjectChat/ProjectChat";
import { CurrentUserPermissionsProvider } from "hooks/useCurrentUserPermissions";
import { useProject } from "hooks/useProject";
import { createPath, CollectionsName } from "utils/utils";
import NoMatch from "../NoMatch/NoMatch";
import { ProjectLabel } from "./Project.styles";

const Project = () => {
  const { doc, project, loading, error } = useProject();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorData />;
  }

  if (!project) {
    return <NoMatch />;
  }

  const pathMessages = createPath(CollectionsName.projects, doc.id, CollectionsName.messages);
  return (
    <CurrentUserPermissionsProvider id={project.teamId}>
      <ProjectLabel>Tablica: {project.name}</ProjectLabel>
      <ProjectBoard />
      <ProjectChat name={project.name} path={pathMessages} />
    </CurrentUserPermissionsProvider>
  );
};

export default Project;
