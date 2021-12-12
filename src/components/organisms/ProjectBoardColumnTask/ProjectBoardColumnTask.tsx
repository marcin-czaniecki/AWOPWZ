import { printDate } from "@janossik/date";
import Button from "components/atoms/Button/Button";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import HoverIcon from "components/molecules/HoverIcon/HoverIcon";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import TaskForm from "components/organisms/ProjectBoardColumnTaskForm/ProjectBoardColumnTaskForm";
import { ProjectService } from "firebase/ProjectService";
import StoreService from "firebase/StoreService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useToast } from "hooks/useToast";
import { useUser } from "hooks/useUser";
import styled from "styled-components";
import { IProjectTaskProps } from "types/componentTypes";
import { ArrayName, getNameUser } from "utils/utils";
import FormModal from "../FormModal/FormModal";
import {
  ProjectBoardColumnTaskButtons,
  WrapperProjectBoardColumnTask,
} from "./ProjectBoardColumnTask.styles";

const { removeArrayElement } = StoreService;

const WrapperHoverIcons = styled.div`
  display: flex;
  margin-left: auto;
  gap: 10px;
`;

const ProjectBoardColumnTask = ({ doc, task, columns, column: { order } }: IProjectTaskProps) => {
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();
  const { setToast } = useToast();
  const projectService = new ProjectService({ columns, doc });
  const { color, backgroundColor, title: content } = task;
  const { length } = columns;

  const removeTask = async () => {
    try {
      await removeArrayElement(ArrayName.tasks, [task], doc);
    } catch (error) {
      setToast("Nie udało się usunąć zadania.");
    }
  };

  const isPermission =
    dataUser?.isAdmin ||
    currentUserPermissions?.isLeader ||
    currentUserPermissions?.canServiceTasks;

  const moveLeft = () => {
    if (isPermission || task.responsibleName === getNameUser(dataUser)) {
      projectService.moveTask(task, -1);
    } else {
      setToast("To zadanie nie zostało przepisane tobie.");
    }
  };
  const moveRight = () => {
    if (isPermission || task.responsibleName === getNameUser(dataUser)) {
      projectService.moveTask(task, 1);
    } else {
      setToast("To zadanie nie zostało przepisane tobie.");
    }
  };
  const isFirstOrder = Number(order) === 0;
  const isLastOrder = Number(order) === length - 1;

  return (
    <WrapperProjectBoardColumnTask color={color} backgroundColor={backgroundColor}>
      <div>
        <div>{content}</div>
      </div>
      <ProjectBoardColumnTaskButtons>
        {!isFirstOrder && (isPermission || task.responsibleName === getNameUser(dataUser)) && (
          <Button onClick={moveLeft}>Cofnij</Button>
        )}
        {!isLastOrder && (isPermission || task.responsibleName === getNameUser(dataUser)) && (
          <Button onClick={moveRight}>Ukończ</Button>
        )}
        <WrapperHoverIcons>
          {task.responsibleName && (
            <HoverIcon letter="O">
              <div>{task.responsibleName}</div>
            </HoverIcon>
          )}
          <HoverIcon letter="T">
            <div>{printDate("ddmmyyyy", "pl", task.timeLimit?.toDate())}</div>
          </HoverIcon>
          <HoverIcon letter="Z">
            <div>{printDate("ddmmyyyy", "pl", task.updatedAt.toDate())}</div>
          </HoverIcon>
        </WrapperHoverIcons>
        {isPermission && (
          <KebabMenu color={color} top>
            <FormModal textButton="Edytuj" maxHeight="350px">
              <TaskForm task={task} />
            </FormModal>
            <ConfirmModal textButton="Usuń" confirmAction={removeTask} maxHeight="120px">
              <p>Czy na pewno chcesz usunąć zadanie?</p>
            </ConfirmModal>
          </KebabMenu>
        )}
      </ProjectBoardColumnTaskButtons>
    </WrapperProjectBoardColumnTask>
  );
};

export default ProjectBoardColumnTask;
