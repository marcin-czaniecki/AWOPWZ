import { useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button/Button";
import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import { IProjectSidebarProps } from "types/componentTypes";
import ProjectBoardColumnForm from "components/organisms/ProjectBoardColumnForm/ProjectBoardColumnForm";
import TaskForm from "components/organisms/ProjectBoardColumnTaskForm/ProjectBoardColumnTaskForm";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useUser } from "hooks/useUser";

const ButtonsProjectSidebar = styled.div`
  display: flex;
  padding: 0 0 10px 0;
  gap: 5px;
`;

const ProjectBoardSidebar = ({ lastOrder, length }: IProjectSidebarProps) => {
  const [typeForm, setTypeForm] = useState(true);
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();

  const setTaskForm = () => {
    setTypeForm(true);
  };
  const setColumnForm = () => {
    setTypeForm(false);
  };
  const isPermissionForTasks =
    dataUser?.isAdmin ||
    currentUserPermissions?.isLeader ||
    currentUserPermissions?.canServiceTasks;
  const isPermissionForColumns =
    dataUser?.isAdmin ||
    currentUserPermissions?.isLeader ||
    currentUserPermissions?.canServiceColumns;
  return (
    <>
      {(isPermissionForTasks || isPermissionForColumns) && (
        <AdditionBar right>
          <>
            <ButtonsProjectSidebar>
              {isPermissionForTasks && <Button onClick={setTaskForm}>Nowe zadanie</Button>}
              {isPermissionForColumns && <Button onClick={setColumnForm}>Nowa kolumna</Button>}
            </ButtonsProjectSidebar>
            <div>
              {typeForm && isPermissionForTasks && <TaskForm />}
              {!typeForm && isPermissionForColumns && (
                <ProjectBoardColumnForm lastOrder={lastOrder} length={length} />
              )}
            </div>
          </>
        </AdditionBar>
      )}
    </>
  );
};

export default ProjectBoardSidebar;
