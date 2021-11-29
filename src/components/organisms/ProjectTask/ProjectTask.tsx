import Button from "components/atoms/Button/Button";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import TaskForm from "components/organisms/TaskForm/TaskForm";
import { ProjectService } from "data/ProjectService";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { IProjectTaskProps } from "types/componentTypes";
import { ArrayName } from "utils/utils";
import { ButtonsProjectTask, WrapperProjectTask } from "./ProjectTask.styles";

const { removeArrayElement } = StoreService;

const ProjectTask = ({ doc, task, columns, column }: IProjectTaskProps) => {
  const projectService = new ProjectService({ columns, doc });
  const { setToast } = useToast();
  const taskRemove = async () => {
    try {
      await removeArrayElement(ArrayName.TASKS, [task], doc);
    } catch (error) {
      setToast("Nie udało się usunąć zadania :c");
    }
  };

  const moveLeft = () => projectService.moveTask(task, -1);
  const moveRight = () => projectService.moveTask(task, 1);
  return (
    <WrapperProjectTask
      color={task.color}
      backgroundColor={task.backgroundColor}
    >
      <div>{task.title}</div>
      <ButtonsProjectTask>
        {Number(column.order) !== 0 && (
          <Button onClick={moveLeft}>Cofnij</Button>
        )}
        {Number(column.order) !== columns.length - 1 && (
          <Button onClick={moveRight}>Ukończono</Button>
        )}

        <KebabMenu color={task.color} top>
          <ConfirmModal
            textButton="Edytuj"
            maxHeight="250px"
            invisibleNo
            invisibleYes
          >
            <TaskForm task={task} />
          </ConfirmModal>
          <ConfirmModal
            textButton="Usuń"
            confirmAction={taskRemove}
            maxHeight="110px"
          >
            <p>Czy na pewno chcesz usunąć zadanie?</p>
          </ConfirmModal>
        </KebabMenu>
      </ButtonsProjectTask>
    </WrapperProjectTask>
  );
};

export default ProjectTask;
