import Button from "components/atoms/Button/Button";
import fb from "data/fb";
import { updateDoc } from "firebase/firestore";
import { useError } from "hooks/useError";
import { PropsProjectTask } from "types/types";
import { moveTask, downOrderTask, upOrderTask } from "utils/utils";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { ButtonsProjectTask, WrapperProjectTask } from "./ProjectTask.styles";

const ProjectTask = ({ doc, task, columns, column }: PropsProjectTask) => {
  const [, setError] = useError();
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
          <ConfirmModal textButton="usuń" confirmAction={taskRemove} buttonVersion="secondary">
            <p>Czy na pewno chcesz usunąć zadanie?</p>
          </ConfirmModal>
          {Number(column.order) !== 0 && (
            <Button onClick={() => moveTask(doc, task, columns, downOrderTask)} secondary>
              cofnij
            </Button>
          )}
          {Number(column.order) !== columns.length - 1 && (
            <Button onClick={() => moveTask(doc, task, columns, upOrderTask)} secondary>
              ukończono
            </Button>
          )}
        </ButtonsProjectTask>
      </div>
    </WrapperProjectTask>
  );
};

export default ProjectTask;
