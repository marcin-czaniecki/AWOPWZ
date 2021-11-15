import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import ProjectTask from "components/molecules/ProjectTask/ProjectTask";
import styled from "styled-components";
import { PropsProjectColumn, ITask } from "types/types";
import { updateTasksOrderFromCurrentColumn, updateArray, enumName } from "utils/utils";

const WrapperProjectColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 568px;
  gap: 5px;
  overflow-y: auto;
`;

const ProjectColumn = ({ doc, column, tasks, columns }: PropsProjectColumn) => {
  const checkTaskOrder = (task: ITask) => task.columnOrder === column.order;
  const moveAllTaskToOrderColumn0 = () => {
    if (column.order !== "0") {
      const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
      const newVersionTasks = updateTasksOrderFromCurrentColumn(tasks, column, "0");
      updateArray(doc, enumName.TASKS, oldVersionTasks, newVersionTasks);
    }
  };
  const columnRemove = () => {
    moveAllTaskToOrderColumn0();
    const columnsHigherOrder = [...columns.filter(({ order }) => Number(order) > Number(column.order))];
    const columnsWithUpdatedOrder = columnsHigherOrder.map((column) => {
      const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
      const newVersionTasks = updateTasksOrderFromCurrentColumn(tasks, column);
      updateArray(doc, enumName.TASKS, oldVersionTasks, newVersionTasks);

      const updatingColumn = { ...column };
      updatingColumn.order = (Number(updatingColumn.order) - 1).toString();
      return updatingColumn;
    });

    updateArray(doc, enumName.COLUMNS, [column, ...columnsHigherOrder], columnsWithUpdatedOrder);
  };
  return (
    <WrapperProjectColumn key={column.id + column.order}>
      <div>
        {column.name} : {column.order}
        <ConfirmModal textButton="usuń" confirmAction={columnRemove} buttonVersion="secondary" maxHeight="130px">
          <p>Czy na pewno chcesz usunąć kolumne? Zadania zostaną przeniosione do pierwszej kolumny.</p>
        </ConfirmModal>
      </div>
      {tasks.filter(checkTaskOrder).map((task) => (
        <ProjectTask key={task.title + task.createdAt} doc={doc} task={task} column={column} columns={columns} />
      ))}
    </WrapperProjectColumn>
  );
};

export default ProjectColumn;
