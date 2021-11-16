import Button from "components/atoms/Button/Button";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import fb from "data/fb";
import { updateDoc } from "firebase/firestore";
import { useError } from "hooks/useError";
import { PropsProjectTask } from "types/types";
import { downOrderTask, moveTask, upOrderTask } from "utils/firebaseUtils";
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal";
import TaskForm from "../TaskForm/TaskForm";
import { ButtonsProjectTask, WrapperProjectTask } from "./ProjectTask.styles";

const ProjectTask = ({ doc, task, columns, column }: PropsProjectTask) => {
  const { setError } = useError();
  const taskRemove = async () => {
    try {
      await updateDoc(doc, {
        tasks: fb.arrayRemove(task),
      });
    } catch (error) {
      setError("Nie udało się usunąć zadania :c");
    }
  };
  return (
    <WrapperProjectTask color={task.color} backgroundColor={task.backgroundColor}>
      <div>
        <div>{task.title}</div>
        <ButtonsProjectTask>
          {Number(column.order) !== 0 && (
            <Button onClick={() => moveTask(doc, task, columns, downOrderTask)}>Cofnij</Button>
          )}
          {Number(column.order) !== columns.length - 1 && (
            <Button onClick={() => moveTask(doc, task, columns, upOrderTask)}>Ukończono</Button>
          )}
          <KebabMenu color={task.color}>
            <ConfirmModal textButton="Edytuj" confirmAction={taskRemove} maxHeight="250px" invisibleNo invisibleYes>
              <>
                <TaskForm doc={doc} task={task} />
              </>
            </ConfirmModal>
            <ConfirmModal textButton="Usuń" confirmAction={taskRemove} maxHeight="110px">
              <p>Czy na pewno chcesz usunąć zadanie?</p>
            </ConfirmModal>
          </KebabMenu>
        </ButtonsProjectTask>
      </div>
    </WrapperProjectTask>
  );
};

export default ProjectTask;
