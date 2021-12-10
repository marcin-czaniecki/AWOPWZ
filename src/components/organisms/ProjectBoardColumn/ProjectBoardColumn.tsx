import Wip from "components/atoms/Wip/Wip";
import List from "components/molecules/List/List";
import { useProject } from "hooks/useProject";
import { Navigate, useLocation } from "react-router-dom";
import { IColumn } from "types/types";
import { checkTaskOrder } from "utils/utils";
import ProjectBoardColumnHeader from "../ProjectBoardColumnHeader/ProjectBoardColumnHeader";
import ProjectBoardColumnTask from "../ProjectBoardColumnTask/ProjectBoardColumnTask";
import {
  ProjectBoardColumnFooter,
  WrapperProjectBoardColumnTasks,
} from "./ProjectBoardColumn.styles";

const ProjectBoardColumn = ({ column }: { column: IColumn }) => {
  const { doc, project } = useProject();
  const location = useLocation();

  if (!project) {
    return <Navigate to="/projects" state={{ from: location }} />;
  }
  const { columns, tasks } = project;

  return (
    <div>
      <ProjectBoardColumnHeader column={column} />
      <List
        WrapperList={WrapperProjectBoardColumnTasks}
        array={tasks.filter((task) => checkTaskOrder(task, column))}
        callbackfn={(task, i) => (
          <Wip key={task.title + task.createdAt} wip={column.wip === i + 1}>
            <ProjectBoardColumnTask doc={doc} task={task} column={column} columns={columns} />
          </Wip>
        )}
      />
      <ProjectBoardColumnFooter>WIP: {column.wip}</ProjectBoardColumnFooter>
    </div>
  );
};

export default ProjectBoardColumn;
