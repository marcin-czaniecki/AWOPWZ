import Button from "components/atoms/Button/Button";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import Loading from "components/molecules/Loading/Loading";
import ProjectBody from "components/organisms/ProjectBody/ProjectBody";
import StoreService from "data/StoreService";
import { DocumentReference } from "firebase/firestore";
import { ProjectProvider } from "hooks/useProject";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { IProject } from "types/types";
import { EnumCollectionsName, EnumNameOfProjectArrays } from "utils/utils";

const WrapperProjectHeader = styled.div`
  display: flex;
  padding: 7px 10px;
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.background};
  margin-bottom: 10px;
  div button:first-child {
    min-width: 10px;
  }
  div button {
    min-width: 100px;
    height: 100%;
  }
`;

interface IProjectHeader {
  pinnedProject: {
    name: string;
    ref: DocumentReference<IProject>;
  } | null;
  setPinnedProject: React.Dispatch<
    React.SetStateAction<{
      name: string;
      ref: DocumentReference<IProject>;
    } | null>
  >;
}

const ProjectHeader = ({ pinnedProject, setPinnedProject }: IProjectHeader) => {
  const { dataUser } = useUser();

  const unpin = () => {
    if (dataUser && dataUser.pinnedProjects) {
      StoreService.removeArrayElement(
        EnumNameOfProjectArrays.PINNED_PROJECTS,
        [pinnedProject],
        StoreService.sync.doc(EnumCollectionsName.USERS, dataUser?.uid)
      );

      setPinnedProject(dataUser.pinnedProjects[0]);
    }
  };
  return (
    <WrapperProjectHeader>
      <div>{pinnedProject?.name}</div>
      <KebabMenu>
        <>
          {dataUser?.pinnedProjects?.map((pinnedProject) => {
            return (
              <div key={pinnedProject.name + "button"}>
                <Button onClick={() => setPinnedProject(pinnedProject)}>{pinnedProject.name}</Button>
              </div>
            );
          })}
        </>
        <ConfirmModal textButton={`Odepnij ${pinnedProject?.name}`} confirmAction={unpin}>
          <p>Po tej akcji nie będziesz widzieć tego projektu w Dashboard</p>
        </ConfirmModal>
      </KebabMenu>
    </WrapperProjectHeader>
  );
};

const Dashboard = () => {
  const { dataUser } = useUser();
  const [pinnedProject, setPinnedProject] = useState<{ name: string; ref: DocumentReference<IProject> } | null>(null);
  const [project, loading, error] = useDocumentData(pinnedProject?.ref);
  useEffect(() => {
    if (dataUser?.pinnedProjects && pinnedProject === null) {
      if (dataUser.pinnedProjects[0]) {
        setPinnedProject(dataUser.pinnedProjects[0]);
      }
    }

    return () => {};
  }, [dataUser?.pinnedProjects, pinnedProject]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div style={{ display: "grid" }}>
      <h1>Witamy w dashboard</h1>
      {dataUser?.pinnedProjects ? (
        <>
          {project && pinnedProject && pinnedProject.ref && (
            <ProjectProvider id={pinnedProject.ref.id}>
              <>
                <ProjectHeader pinnedProject={pinnedProject} setPinnedProject={setPinnedProject} />
                <ProjectBody />
              </>
            </ProjectProvider>
          )}
        </>
      ) : (
        <div>
          <p>
            Tutaj będziesz mieć dostęp do przypiętych projektów (tablica kanban). Najlepiej, żebyś przypinał projekty nad którymi aktualnie
            pracujesz.
          </p>
          <div>
            <p>Instrukcja przypięcia projektu</p>
            <ul>
              <li>Otwórz nawigacje w prawym górnym rogu.</li>
              <li>Kliknij link o nazwie Projekty.</li>
              <li>Jeżeli nie ma żadnych projektów możesz je dodać otwierając w prawym dolnym rogu formularz i wypełnij go.</li>
              <li>Kliknij na trzy kropki (kebab menu) i wybierz przypnij.</li>
              <li>Teraz możesz się cieszyć z szybkiego dostępu do wybranego projektu.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
