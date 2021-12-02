import List from "components/molecules/List/List";
import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";
import { IColumn } from "types/types";
import ProjectBoardColumn from "../ProjectBoardColumn/ProjectBoardColumn";
import ProjectBoardSidebar from "../ProjectBoardSidebar/ProjectBoardSidebar";
import { WrapperProjectBoardColumns } from "./ProjectBoard.styles";

const ProjectBoard = () => {
  const { project, loading, error } = useProject();
  const sortOrder = (a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <ProjectBoardSidebar
        lastOrder={project.columns[project.columns.length - 1]?.order || 0}
        length={project.columns.length}
      />
      <List
        WrapperList={WrapperProjectBoardColumns}
        array={project.columns.sort(sortOrder)}
        callbackfn={(column) => (
          <ProjectBoardColumn
            key={column.name + column.id + column.order + column.wip}
            column={column}
          />
        )}
      />
    </>
  );
};
export default ProjectBoard;
