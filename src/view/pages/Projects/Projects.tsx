import Loading from "components/molecules/Loading/Loading";
import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import FormProject from "components/organisms/ProjectForm/ProjectForm";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IProject } from "types/types";
import { collectionReferenceProjects } from "utils/references";
import { useUser } from "hooks/useUser";

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
  const [value, loading, error] = useCollection(collectionReferenceProjects);
  if (loading) {
    return <Loading />;
  }
  if (error || !dataUser) {
    return <div>error</div>;
  }
  return (
    <>
      <AdditionBar right>
        <FormProject />
      </AdditionBar>
      <WrapperProjects>
        {value?.docs.map((doc) => {
          const data = doc.data() as IProject;
          const permissions = dataUser.teams.find((team) => team.id === data.teamId);
          if (!permissions) return null;
          return <ProjectCard key={doc.id + Projects.name} id={doc.id} {...data} />;
        })}
      </WrapperProjects>
    </>
  );
};

export default Projects;
