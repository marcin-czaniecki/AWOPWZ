import Wip from "components/atoms/Wip/Wip";
import List from "components/molecules/List/List";
import { useProject } from "hooks/useProject";
import styled from "styled-components";
import { IColumn } from "types/types";
import { checkTaskOrder } from "utils/utils";
import ProjectColumnHeader from "../ProjectColumnHeader/ProjectColumnHeader";
import ProjectTask from "../ProjectTask/ProjectTask";
import { WrapperProjectColumnTasks } from "./ProjectColumn.styles";

const WrapperProjectColumnFooter = styled.div`
  padding: 7px 10px;
`;

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
            <ProjectTask
              doc={doc}
              task={task}
              column={column}
              columns={columns}
            />
          </Wip>
        )}
      />
      <WrapperProjectColumnFooter>WIP: {column.wip}</WrapperProjectColumnFooter>
    </div>
  );
};

export default ProjectColumn;
