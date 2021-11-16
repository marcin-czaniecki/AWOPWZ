import Loading from "components/molecules/Loading/Loading";
import SideBar from "components/molecules/SideBar/SideBar";
import FormProject from "components/organisms/FormProject/FormProject";
import ProjectCard from "components/organisms/ProjectCard/ProjectCard";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IProject } from "types/types";
import { collectionReferenceProject } from "utils/firebaseUtils";

const WrapperProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 100%, 1300px);
  margin: 0 auto;
  gap: 20px;
`;

const Projects = () => {
  const [value, loading, error] = useCollection(collectionReferenceProject);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <WrapperProjects>
      <SideBar right>
        <FormProject />
      </SideBar>
      {value?.docs.map((doc) => {
        const data = doc.data() as IProject;
        return <ProjectCard key={doc.id} id={doc.id} {...data} />;
      })}
    </WrapperProjects>
  );
};

export default Projects;
