import { useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button/Button";
import SideBar from "components/molecules/SideBar/SideBar";
import { IProjectSidebarProps } from "types/componentTypes";
import ColumnForm from "components/organisms/ColumnForm/ColumnForm";
import TaskForm from "components/organisms/TaskForm/TaskForm";

const ButtonsProjectSidebar = styled.div`
  display: flex;
  padding: 0 0 10px 0;
  gap: 5px;
`;

const ProjectSidebar = ({ lastOrder, length }: IProjectSidebarProps) => {
  const [typeForm, setTypeForm] = useState(false);
  const setTaskForm = () => {
    setTypeForm(true);
  };
  const setColumnForm = () => {
    setTypeForm(false);
  };
  return (
    <SideBar right>
      <>
        <ButtonsProjectSidebar>
          <Button onClick={setTaskForm}>Nowe zadanie</Button>
          <Button onClick={setColumnForm}>Nowa kolumna</Button>
        </ButtonsProjectSidebar>
        <div>
          {typeForm && <TaskForm />}
          {!typeForm && <ColumnForm lastOrder={lastOrder} length={length} />}
        </div>
      </>
    </SideBar>
  );
};

export default ProjectSidebar;
