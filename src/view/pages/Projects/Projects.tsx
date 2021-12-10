import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import Instruction from "components/molecules/Instruction/Instruction";
import Loading from "components/molecules/Loading/Loading";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import FormProject from "components/organisms/ProjectForm/ProjectForm";
import { CurrentUserPermissionsProvider } from "hooks/useCurrentUserPermissions";
import { useUser } from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { IProject } from "types/types";
import { instructionCreateProjects } from "utils/instructions";
import { collectionReferenceProjects } from "utils/references";
import { WrapperProjects } from "./Projects.styles";

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
        {projects?.docs.length ? (
          projects.docs.map((doc) => {
            const data = doc.data() as IProject;
            const permissions = dataUser.teams.find((team) => team.id === data.teamId);
            const isPermission = !permissions && !dataUser.isAdmin;

            if (isPermission) return null;
            return (
              <CurrentUserPermissionsProvider key={doc.id + Projects.name} id={permissions?.id}>
                <ProjectCard id={doc.id} {...data} />
              </CurrentUserPermissionsProvider>
            );
          })
        ) : (
          <Instruction {...instructionCreateProjects} />
        )}
      </WrapperProjects>
    </>
  );
};

export default Projects;
