import Button from "components/atoms/Button/Button";
import Wip from "components/atoms/Wip/Wip";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import List from "components/molecules/List/List";
import { DocumentReference } from "firebase/firestore";
import { useProject } from "hooks/useProject";
import styled from "styled-components";
import { theme } from "theme/theme";
import { IColumn, IProject, ITask } from "types/types";
import { columnSwap, columnRemove } from "utils/firebaseUtils";
import { checkTaskOrder } from "utils/utils";
import ColumnForm from "../ColumnForm/ColumnForm";
import ProjectTask from "../ProjectTask/ProjectTask";
import { WrapperArrowButtons, WrapperProjectColumnHeader, WrapperProjectColumnTasks } from "./ProjectColumn.styles";

const WrapperProjectColumnFooter = styled.div`
  padding: 7px 10px;
`;

const columnSupport = (doc: DocumentReference<IProject>, column: IColumn, columns: IColumn[], tasks: ITask[]) => ({
  swapWithASmallerOrder: () => columnSwap(doc, column, columns, tasks, -1),
  swapWithALargerOrder: () => columnSwap(doc, column, columns, tasks, 1),
  columnRemove: () => columnRemove(doc, column, columns, tasks),
});

const SwitchButtons = ({
  isVisibleLeftButton = true,
  isVisibleRightButton = true,
  actionLeftButton,
  actionRightButton,
}: {
  isVisibleLeftButton?: boolean;
  isVisibleRightButton?: boolean;
  actionLeftButton: () => void;
  actionRightButton: () => void;
}) => {
  return (
    <WrapperArrowButtons>
      {isVisibleLeftButton && <Button typeButton="arrow" onClick={actionLeftButton} />}
      {isVisibleRightButton && <Button typeButton="arrow" onClick={actionRightButton} arrowRight />}
    </WrapperArrowButtons>
  );
};

const ProjectColumnHeader = ({ column }: { column: IColumn }) => {
  const {
    doc,
    project: { columns, tasks },
  } = useProject();
  const { name, order } = column;
  const { swapWithASmallerOrder, swapWithALargerOrder, columnRemove } = columnSupport(doc, column, columns, tasks);

  const isUnequalWithFirstOrder = 0 !== order;
  const isUnequalWithLastOrder = columns[columns.length - 1].order !== order;
  return (
    <WrapperProjectColumnHeader>
      <div>{name}</div>
      <KebabMenu color={theme.color.primary}>
        <SwitchButtons
          isVisibleLeftButton={isUnequalWithFirstOrder}
          isVisibleRightButton={isUnequalWithLastOrder}
          actionLeftButton={swapWithASmallerOrder}
          actionRightButton={swapWithALargerOrder}
        />
        <ConfirmModal invisibleYes invisibleNo maxHeight="200px" textButton="Edytuj">
          <ColumnForm column={column} />
        </ConfirmModal>
        <ConfirmModal confirmAction={columnRemove} maxHeight="150px" textButton="usuń">
          <p>Czy na pewno chcesz usunąć kolumnę? Zadania zostaną przeniesione do pierwszej kolumny!</p>
        </ConfirmModal>
      </KebabMenu>
    </WrapperProjectColumnHeader>
  );
};

const ProjectColumn = ({ column }: { column: IColumn }) => {
  const {
    doc,
    project: { columns, tasks },
  } = useProject();

  return (
    <div>
      <ProjectColumnHeader column={column} />
      <List
        WrapperList={WrapperProjectColumnTasks}
        array={tasks.filter((task) => checkTaskOrder(task, column))}
        callbackfn={(task, i) => (
          <Wip key={task.title + task.createdAt} wip={column.wip === i + 1}>
            <ProjectTask doc={doc} task={task} column={column} columns={columns} />
          </Wip>
        )}
      />
      <WrapperProjectColumnFooter>WIP: {column.wip}</WrapperProjectColumnFooter>
    </div>
  );
};

export default ProjectColumn;
