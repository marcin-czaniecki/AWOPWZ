import ConfirmModal from "components/molecules/ConfirmModal/ConfirmModal";
import KebabMenu from "components/molecules/KebabMenu/KebabMenu";
import SwitchButtons from "components/molecules/SwitchButtons/SwitchButtons";
import { ProjectService } from "fb/ProjectService";
import { useCurrentUserPermissions } from "hooks/useCurrentUserPermissions";
import { useProject } from "hooks/useProject";
import { useUser } from "hooks/useUser";
import { useLocation, Navigate } from "react-router-dom";
import { theme } from "theme/theme";
import { IColumn } from "types/types";
import ProjectBoardColumnForm from "../ProjectBoardColumnForm/ProjectBoardColumnForm";
import { WrapperProjectColumnHeader } from "./ProjectBoardColumnHeader.styles";

const ProjectBoardColumnHeader = ({ column }: { column: IColumn }) => {
  const { doc, project } = useProject();
  const location = useLocation();
  const { dataUser } = useUser();
  const [currentUserPermissions] = useCurrentUserPermissions();
  if (!project) {
    return <Navigate to="/projects" state={{ from: location }} />;
  }
  const { columns, tasks } = project;

  const { name, order } = column;
  const projectService = new ProjectService({ tasks, columns, doc });

  const { swapWithASmallerOrder, swapWithALargerOrder, columnRemove } =
    projectService.getColumnSupport(column);

  const isUnequalWithFirstOrder = 0 !== order;
  const isUnequalWithLastOrder = columns[columns.length - 1].order !== order;
  const isPermissionForColumns =
    dataUser?.isAdmin ||
    currentUserPermissions?.isLeader ||
    currentUserPermissions?.canServiceColumns;
  return (
    <WrapperProjectColumnHeader>
      <div>{name}</div>
      {isPermissionForColumns && (
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
            <ProjectBoardColumnForm column={column} />
          </ConfirmModal>
          <ConfirmModal
            confirmAction={columnRemove}
            maxHeight="150px"
            textButton="usuń"
          >
            <p>
              Czy na pewno chcesz usunąć kolumnę? Zadania zostaną przeniesione
              do pierwszej kolumny!
            </p>
          </ConfirmModal>
        </KebabMenu>
      )}
    </WrapperProjectColumnHeader>
  );
};

export default ProjectBoardColumnHeader;
