import { columnSwap, columnRemove } from "utils/firebaseUtils";
import ArrowButton from "components/atoms/ArrowButton/ArrowButton";
import ColumnForm from "components/organisms/ColumnForm/ColumnForm";
import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import { useProject } from "hooks/useProject";
import { theme } from "theme/theme";
import { IColumn } from "types/types";
import { WrapperProjectColumnHeader } from "./ProjectColumnHeader.styles";

const ProjectColumnHeader = ({ column }: { column: IColumn }) => {
  const { doc, project } = useProject();
  const { columns, tasks } = project;
  const { name, order } = column;

  const onClickColumnSwapToLeft = () => columnSwap(doc, column, columns, tasks, -1);
  const onClickColumnSwapToRight = () => columnSwap(doc, column, columns, tasks, 1);
  const confirmColumnRemove = () => columnRemove(doc, column, columns, tasks);

  const unequalWithFirstOrder = 0 !== order;
  const unequalWithLastOrder = columns[columns.length - 1].order !== order;

  return (
    <WrapperProjectColumnHeader>
      <div>{name}</div>
      <KebabMenu color={theme.color.primary}>
        <>
          {unequalWithFirstOrder && <ArrowButton size="30px" onClick={onClickColumnSwapToLeft} />}
          <ConfirmModal invisibleYes invisibleNo maxHeight="200px" textButton="Edytuj">
            <ColumnForm column={column} />
          </ConfirmModal>
          <ConfirmModal confirmAction={confirmColumnRemove} maxHeight="150px" textButton="usuń">
            <p>Czy na pewno chcesz usunąć kolumnę? Zadania zostaną przeniesione do pierwszej kolumny!</p>
          </ConfirmModal>
          {unequalWithLastOrder && <ArrowButton right size="30px" onClick={onClickColumnSwapToRight} />}
        </>
      </KebabMenu>
    </WrapperProjectColumnHeader>
  );
};

export default ProjectColumnHeader;
