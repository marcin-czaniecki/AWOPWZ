import Loading from "components/molecules/Loading/Loading";
import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import FormProject from "components/organisms/ProjectForm/ProjectForm";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IProject } from "types/types";
import { collectionReferenceProjects } from "utils/references";
import { useUser } from "hooks/useUser";
import { CurrentUserPermissionsProvider } from "hooks/useCurrentUserPermissions";

const WrapperProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 100%, 1300px);
  margin: 0 auto;
  justify-content: center;
  gap: 20px;
`;

const Projects = () => {
  const { dataUser } = useUser();
  const [projects, loading, error] = useCollection(collectionReferenceProjects);

  if (loading) {
    return <Loading />;
  }
  if (error || !dataUser) {
    return <div>error</div>;
  }

  const isPermission =
    dataUser?.isAdmin ||
    dataUser.teams.find((team) => team.isLeader === true || team.canServiceProjects === true);
  return (
    <>
      {isPermission && (
        <AdditionBar right>
          <FormProject />
        </AdditionBar>
      )}
      <WrapperProjects>
        {projects?.docs.map((doc) => {
          const data = doc.data() as IProject;
          const permissions = dataUser.teams.find((team) => team.id === data.teamId);
          const isPermission = !permissions && !dataUser.isAdmin;

          if (isPermission) return null;
          return (
            <CurrentUserPermissionsProvider key={doc.id + Projects.name} id={permissions?.id}>
              <ProjectCard id={doc.id} {...data} />
            </CurrentUserPermissionsProvider>
          );
        })}
      </WrapperProjects>
    </>
  );
};

export default Projects;
