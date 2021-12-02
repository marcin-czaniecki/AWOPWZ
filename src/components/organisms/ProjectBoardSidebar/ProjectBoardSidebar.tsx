import { useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button/Button";
import AdditionBar from "components/molecules/AdditionBar/AdditionBar";
import { IProjectSidebarProps } from "types/componentTypes";
import ColumnForm from "components/organisms/ColumnForm/ColumnForm";
import TaskForm from "components/organisms/ProjectBoardColumnTaskForm/ProjectBoardColumnTaskForm";

const ButtonsProjectSidebar = styled.div`
  display: flex;
  padding: 0 0 10px 0;
  gap: 5px;
`;

const ProjectBoardSidebar = ({ lastOrder, length }: IProjectSidebarProps) => {
  const [typeForm, setTypeForm] = useState(false);
  const setTaskForm = () => {
    setTypeForm(true);
  };
  const setColumnForm = () => {
    setTypeForm(false);
  };
  return (
    <AdditionBar right>
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
    </AdditionBar>
  );
};

export default ProjectBoardSidebar;
