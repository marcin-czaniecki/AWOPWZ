import Details from "components/molecules/Details/Details";
import HoverIcon from "components/molecules/HoverIcon/HoverIcon";
import Instruction from "components/molecules/Instruction/Instruction";
import List from "components/molecules/List/List";
import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";
import { IColumn } from "types/types";
import {
  instructionCreateProjectBoardColumns,
  instructionCreateProjectBoardTasks,
} from "utils/instructions";
import ProjectBoardColumn from "../ProjectBoardColumn/ProjectBoardColumn";
import ProjectBoardSidebar from "../ProjectBoardSidebar/ProjectBoardSidebar";
import { WrapperProjectBoardColumns } from "./ProjectBoard.styles";

const ProjectBoard = () => {
  const { project, loading, error } = useProject();
  const sortOrder = (a: IColumn, b: IColumn) => (a.order > b.order ? 1 : -1);

  if (loading) {
    return <Loading />;
  }

  if (error || !project) {
    return <div>Error</div>;
  }

  return (
    <>
      <ProjectBoardSidebar
        lastOrder={project.columns[project.columns.length - 1]?.order || 0}
        length={project.columns.length}
      />
      <Details summary="Legenda wykorzystanych ikon">
        <>
          <HoverIcon letter="O" />
          <p>Użytkownik odpowiedzialny za wykonanie zadania.</p>
        </>
        <>
          <HoverIcon letter="T" />
          <p>Data terminu wykonania zadania.</p>
        </>
        <>
          <HoverIcon letter="Z" />
          <p>Data ostatniej aktualizacji.</p>
        </>
      </Details>
      {!project.columns.length && <Instruction {...instructionCreateProjectBoardColumns} />}
      {!project.tasks.length && <Instruction {...instructionCreateProjectBoardTasks} />}
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
