import ArrowButton from "components/atoms/ArrowButton/ArrowButton";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import ProjectTask from "components/organisms/ProjectTask/ProjectTask";
import { useProject } from "hooks/useProject";
import styled, { css } from "styled-components";
import { theme } from "theme/theme";
import { PropsProjectColumn } from "types/types";
import { columnSwap, columnRemove, checkTaskOrder } from "utils/firebaseUtils";
import ColumnForm from "../ColumnForm/ColumnForm";

const HeaderProjectColumn = styled.div`
  display: flex;
  position: relative;
  padding: 5px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WrapperContentProjectColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: min(calc(100vh - 150px), 600px);
  padding-right: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 5px;
  overflow-y: auto;
`;

const WrapperWip = styled.div<{ wip?: boolean }>`
  position: relative;
  ${({ wip }) =>
    wip &&
    css`
      border-bottom: solid 4px ${({ theme }) => theme.color.error};
      padding-bottom: 10px;
      margin-bottom: 30px;
      ::after {
        content: "Przekroczenie WIP";
        position: absolute;
        display: block;
        color: ${({ theme }) => theme.color.error};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        bottom: -30px;
      }
    `}
`;

const ProjectColumn = ({ column }: PropsProjectColumn) => {
  const { doc, data } = useProject();
  if (!data) {
    return <div>Nie udało się wczytać kolumny</div>;
  }
  const { columns, tasks } = data;
  return (
    <div>
      <HeaderProjectColumn>
        <div>{column.name}</div>
        <KebabMenu color={theme.color.primary}>
          <>
            {0 !== column.order && (
              <ArrowButton
                size="30px"
                onClick={() => {
                  columnSwap(doc, column, columns, tasks, -1);
                }}
              />
            )}
            <ConfirmModal textButton="Edytuj" maxHeight="200px" invisibleYes invisibleNo>
              <ColumnForm doc={doc} column={column} />
            </ConfirmModal>
            <ConfirmModal
              textButton="usuń"
              confirmAction={() => columnRemove(doc, column, columns, tasks)}
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
      </HeaderProjectColumn>
      <WrapperContentProjectColumn>
        {tasks
          .filter((task) => checkTaskOrder(task, column))
          .map((task, i) => (
            <WrapperWip key={task.title + task.createdAt} wip={column.wip === i + 1}>
              <ProjectTask doc={doc} task={task} column={column} columns={columns} />
            </WrapperWip>
          ))}
      </WrapperContentProjectColumn>
      <div>WIP: {column.wip}</div>
    </div>
  );
};

export default ProjectColumn;
