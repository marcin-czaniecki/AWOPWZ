import Button from "components/atoms/Button/Button";
import SideBar from "components/molecules/SideBar/SideBar";
import { useState } from "react";
import styled from "styled-components";
import { PropsTaskFormAndColumnFromSidebar } from "types/types";
import ColumnForm from "../ColumnForm/ColumnForm";
import TaskForm from "../TaskForm/TaskForm";

const ButtonsTaskFormAndColumnFromSidebar = styled.div`
  display: flex;
  padding: 0 0 10px 0;
  gap: 5px;
`;

const TaskFormAndColumnFromSidebar = ({ doc, lastOrder, length }: PropsTaskFormAndColumnFromSidebar) => {
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
        <ButtonsTaskFormAndColumnFromSidebar>
          <Button onClick={setTaskForm}>Nowe zadanie</Button>
          <Button onClick={setColumnForm}>Nowa kolumna</Button>
        </ButtonsTaskFormAndColumnFromSidebar>
        <div>
          {typeForm && <TaskForm doc={doc} />}
          {!typeForm && <ColumnForm doc={doc} lastOrder={lastOrder} length={length} />}
        </div>
      </>
    </SideBar>
  );
};

export default TaskFormAndColumnFromSidebar;
