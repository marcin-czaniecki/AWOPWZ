import fb, { auth, store } from "data/fb";
import { DocumentReference, Timestamp, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { IProject } from "types/types";
import { useParams } from "react-router-dom";
import SideBar from "components/molecules/SideBar/SideBar";
import styled from "styled-components";
import ProjectColumn from "components/organisms/ProjectColumn/ProjectColumn";
import { arrayPushOneElement, generateId } from "utils/utils";
import { useNavigate } from "react-router-dom";

const EditBar = ({
  doc,
  lastOrder,
  length,
}: {
  doc: DocumentReference<IProject>;
  lastOrder: string;
  length: number;
}) => {
  const AddColumn = async () => {
    arrayPushOneElement(doc, "columns", {
      id: generateId(),
      name: "Przykładowa tablica",
      order: `${length > 0 ? Number(lastOrder) + 1 : 0}`,
    });
  };

  return (
    <SideBar right>
      <div>
        <button
          onClick={async () => {
            if (!auth.currentUser) {
              return;
            }
            await updateDoc(doc, {
              tasks: fb.arrayUnion({
                id: generateId(),
                title: `Przykładowe zadanie ${Math.round(Math.random() * 10)}`,
                author: auth.currentUser.email || auth.currentUser.uid,
                color: `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
                  Math.random() * 255
                )})`,
                backgroundColor: `rgb(${Math.round(Math.random() * 255)},${Math.round(
                  Math.random() * 255
                )},${Math.round(Math.random() * 255)})`,
                columnOrder: "0",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              }),
            });
          }}
        >
          Dodaj zadanie
        </button>
        <button onClick={AddColumn}>Dodaj kolumne</button>
      </div>
    </SideBar>
  );
};

const WrapperColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  @media screen and (min-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1220px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1520px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const StyledButtonBack = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 30px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 100%;
  border: none;
  z-index: 8;
  ::after {
    content: " ";
    position: absolute;
    width: 30%;
    height: 3px;
    background-color: snow;
    left: 32%;
    top: calc(50% - 1.5px);
    transform: translateY(70%) rotate(45deg);
  }
  ::before {
    content: " ";
    position: absolute;
    width: 30%;
    height: 3px;
    background-color: snow;
    left: 32%;
    top: calc(50% - 1.5px);
    transform: translateY(-70%) rotate(-45deg);
  }
`;

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <StyledButtonBack
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};

const Project = () => {
  const { id } = useParams();
  const doc = fb.doc(store, "projects", id || "unknown") as DocumentReference<IProject>;
  const [data, loading, error] = useDocumentData<IProject>(doc);
  if (loading) {
    return <div>loading...</div>;
  }

  if (!data || error) {
    return <div>Nie możemy wczytać tego projektu :/</div>;
  }

  return (
    <>
      <ButtonBack />
      <EditBar
        doc={doc}
        lastOrder={data?.columns[data.columns.length - 1]?.order || "0"}
        length={data.columns.length}
      />
      <WrapperColumns>
        {data.columns
          .sort((a, b) => (Number(a.order) > Number(b.order) ? 1 : -1))
          .map((column) => (
            <ProjectColumn doc={doc} tasks={data.tasks} column={column} columns={data.columns} />
          ))}
      </WrapperColumns>
    </>
  );
};

export default Project;
