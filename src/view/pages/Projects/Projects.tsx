import FiledInput from "components/molecules/FiledInput/FiledInput";
import SideBar from "components/molecules/SideBar/SideBar";
import fb, { store } from "data/fb";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IProject } from "types/types";

const FormProject = styled.form`
  padding: 0 10px;
`;

const AddProjectBar = () => {
  const [name, setName] = useState("");
  return (
    <>
      <SideBar right>
        <FormProject>
          <FiledInput name="projectName" label={"Nazwa projektu"} value={name} setValue={setName} />
        </FormProject>
      </SideBar>
    </>
  );
};

const WrapperProjectCard = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  padding-bottom: 30px;
  color: snow;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.primary};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12),
    0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12);
  :hover {
    transform: scale(1.1);
    transition: 300ms;
  }
`;

const ProjectCard = ({ id, name }: { id: string; name: string }) => {
  return (
    <Link to={`${id}`} style={{ textDecoration: "none" }}>
      <WrapperProjectCard key={id}>{name}</WrapperProjectCard>
    </Link>
  );
};

const WrapperProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 100%, 1300px);
  margin: 0 auto;
  gap: 20px;
`;

const Projects = () => {
  const [value, loading, error] = useCollection(fb.collection(store, "projects"));
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <WrapperProjects>
      <AddProjectBar />
      {value?.docs.map((doc) => {
        const data = doc.data() as IProject;
        return <ProjectCard key={doc.id} id={doc.id} {...data} />;
      })}
    </WrapperProjects>
  );
};

export default Projects;
