import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import SwitchButtons from "components/molecules/SwitchButtons/SwitchButtons";
import { ProjectService } from "data/ProjectService";
import { useProject } from "hooks/useProject";
import { theme } from "theme/theme";
import { IColumn } from "types/types";
import ColumnForm from "../ColumnForm/ColumnForm";
import { WrapperProjectColumnHeader } from "./ProjectColumnHeader.styles";

const ProjectColumnHeader = ({ column }: { column: IColumn }) => {
  const {
    doc,
    project: { columns, tasks },
  } = useProject();
  const { name, order } = column;
  const pS = new ProjectService({ tasks, columns, doc });

  const { swapWithASmallerOrder, swapWithALargerOrder, columnRemove } =
    pS.getColumnSupport(column);

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
        <ConfirmModal
          invisibleYes
          invisibleNo
          maxHeight="200px"
          textButton="Edytuj"
        >
          <ColumnForm column={column} />
        </ConfirmModal>
        <ConfirmModal
          confirmAction={columnRemove}
          maxHeight="150px"
          textButton="usuń"
        >
          <p>
            Czy na pewno chcesz usunąć kolumnę? Zadania zostaną przeniesione do
            pierwszej kolumny!
          </p>
        </ConfirmModal>
      </KebabMenu>
    </WrapperProjectColumnHeader>
  );
};

export default ProjectColumnHeader;
