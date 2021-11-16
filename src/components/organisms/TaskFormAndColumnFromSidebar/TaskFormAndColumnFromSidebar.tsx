import Button from "components/atoms/Button/Button";
import SideBar from "components/molecules/SideBar/SideBar";
import { useState } from "react";
import { PropsTaskFormAndColumnFromSidebar } from "types/types";
import ColumnForm from "../ColumnForm/ColumnForm";
import TaskForm from "../TaskForm/TaskForm";

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
        <div>
          <Button onClick={setTaskForm}>Nowe zadanie</Button>
          <Button onClick={setColumnForm}>Nowa kolumna</Button>
        </div>
        <div>
          {typeForm && <TaskForm doc={doc} />}
          {!typeForm && <ColumnForm doc={doc} lastOrder={lastOrder} length={length} />}
        </div>
      </>
    </SideBar>
  );
};

export default TaskFormAndColumnFromSidebar;
