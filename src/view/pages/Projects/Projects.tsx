import Button from "components/atoms/Button/Button";
import Input from "components/atoms/Input/Input";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import FiledInput from "components/molecules/FiledInput/FiledInput";
import SideBar from "components/molecules/SideBar/SideBar";
import fb, { store } from "data/fb";
import { useError } from "hooks/useError";
import { useCollection } from "react-firebase-hooks/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IProject } from "types/types";
import { enumName } from "utils/utils";

const FormProject = styled.form`
  padding: 0 10px;
  margin-bottom: 10px;
`;

type Inputs = {
  name: string;
};
const collection = fb.collection(store, "projects");

const FormProjectCard = ({ id }: { id?: string }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [, setError] = useError();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    (async () => {
      try {
        if (id) {
          fb.updateDoc(fb.doc(store, "projects", id), {
            name: data.name,
          });
          return;
        }
        fb.addDoc(collection, { name: data.name, [enumName.COLUMNS]: [], [enumName.TASKS]: [] });
      } catch (error) {
        setError("Coś poszło nie tak :c");
      }
    })();
  };
  return (
    <>
      <FormProject onSubmit={handleSubmit(onSubmit)}>
        <FiledInput name="name" label={"Nazwa projektu"}>
          <Input type="text" {...register("name", { required: true })} />
        </FiledInput>
        <Button type="submit">{id ? "Zmień nazwę" : "Dodaj projekt"}</Button>
      </FormProject>
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
  const [, setError] = useError();
  return (
    <div>
      <ConfirmModal
        confirmAction={async () => {
          try {
            fb.deleteDoc(fb.doc(store, "projects", id));
          } catch (error) {
            setError("Z jakiegoś powodu nie udało się usunąć projektu");
          }
        }}
        textButton="Usuń"
        buttonVersion="secondary"
      >
        <p>Czy na pewno chcesz usunąć projekt</p>
      </ConfirmModal>
      <ConfirmModal
        confirmAction={() => {}}
        textButton="Zmień nazwę"
        buttonVersion="secondary"
        maxHeight="120px"
        invisibleYes
        invisibleNo
      >
        <>
          <FormProjectCard id={id} />
        </>
      </ConfirmModal>
      <Link to={`${id}`} style={{ textDecoration: "none" }}>
        <WrapperProjectCard key={id}>{name}</WrapperProjectCard>
      </Link>
    </div>
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
      <SideBar right>
        <FormProjectCard />
      </SideBar>
      {value?.docs.map((doc) => {
        const data = doc.data() as IProject;
        return <ProjectCard key={doc.id} id={doc.id} {...data} />;
      })}
    </WrapperProjects>
  );
};

export default Projects;
