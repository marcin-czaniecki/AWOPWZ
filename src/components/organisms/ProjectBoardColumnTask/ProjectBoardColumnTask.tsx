import Button from "components/atoms/Button/Button";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import TaskForm from "components/organisms/ProjectBoardColumnTaskForm/ProjectBoardColumnTaskForm";
import { ProjectService } from "data/ProjectService";
import StoreService from "data/StoreService";
import { useToast } from "hooks/useToast";
import { IProjectTaskProps } from "types/componentTypes";
import { ArrayName } from "utils/utils";
import FormModal from "../FormModal/FormModal";
import {
  ProjectBoardColumnTaskButtons,
  WrapperProjectBoardColumnTask,
} from "./ProjectBoardColumnTask.styles";

const { removeArrayElement } = StoreService;

const ProjectBoardColumnTask = ({ doc, task, columns, column: { order } }: IProjectTaskProps) => {
  const { setToast } = useToast();
  const projectService = new ProjectService({ columns, doc });
  const { color, backgroundColor, title: content } = task;
  const { length } = columns;

  const removeTask = async () => {
    try {
      await removeArrayElement(ArrayName.tasks, [task], doc);
    } catch (error) {
      setToast("Nie udało się usunąć zadania :c");
    }
  };

  const moveLeft = () => projectService.moveTask(task, -1);
  const moveRight = () => projectService.moveTask(task, 1);
  const isFirstOrder = Number(order) === 0;
  const isLastOrder = Number(order) === length - 1;

  return (
    <WrapperProjectBoardColumnTask color={color} backgroundColor={backgroundColor}>
      <div>{content}</div>
      <ProjectBoardColumnTaskButtons>
        {!isFirstOrder && <Button onClick={moveLeft}>Cofnij</Button>}
        {!isLastOrder && <Button onClick={moveRight}>Ukończono</Button>}
        <KebabMenu color={color} top>
          <FormModal textButton="Edytuj" maxHeight="250px">
            <TaskForm task={task} />
          </FormModal>
          <ConfirmModal textButton="Usuń" confirmAction={removeTask} maxHeight="110px">
            <p>Czy na pewno chcesz usunąć zadanie?</p>
          </ConfirmModal>
        </KebabMenu>
      </ProjectBoardColumnTaskButtons>
    </WrapperProjectBoardColumnTask>
  );
};

export default ProjectBoardColumnTask;
