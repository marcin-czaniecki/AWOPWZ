import ArrowButton from "components/atoms/ArrowButton/ArrowButton";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import ProjectTask from "components/organisms/ProjectTask/ProjectTask";
import styled from "styled-components";
import { theme } from "theme/theme";
import { PropsProjectColumn } from "types/types";
import { columnSwap, columnRemove, checkTaskOrder } from "utils/firebaseUtils";

const WrapperProjectColumn = styled.div`
  display: flex;
  padding-right: 5px;
  flex-direction: column;
  height: 568px;
  gap: 5px;
  overflow-y: auto;
`;

const ProjectColumn = ({ doc, column, tasks, columns }: PropsProjectColumn) => {
  return (
    <div key={column.id + column.order}>
      <div
        style={{
          display: "flex",
          position: "relative",
          padding: "5px 18px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div>{column.name}</div>
        <KebabMenu color={theme.color.primary}>
          <>
            {"0" !== column.order && (
              <ArrowButton
                size="30px"
                onClick={() => {
                  columnSwap(doc, column, columns, tasks, -1);
                }}
              />
            )}
            <ConfirmModal
              textButton="usuń"
              confirmAction={() => columnRemove(doc, column, columns, tasks)}
              buttonVersion="secondary"
              maxHeight="150px"
            >
              <p>Czy na pewno chcesz usunąć kolumne? Zadania zostaną przeniosione do pierwszej kolumny.</p>
            </ConfirmModal>
            {columns[columns.length - 1].order !== column.order && (
              <ArrowButton
                right
                size="30px"
                onClick={() => {
                  columnSwap(doc, column, columns, tasks, 1);
                }}
              />
            )}
          </>
        </KebabMenu>
      </div>
      <WrapperProjectColumn>
        {tasks
          .filter((task) => checkTaskOrder(task, column))
          .map((task) => (
            <ProjectTask key={task.title + task.createdAt} doc={doc} task={task} column={column} columns={columns} />
          ))}
      </WrapperProjectColumn>
    </div>
  );
};

export default ProjectColumn;
