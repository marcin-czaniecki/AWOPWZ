import ProjectTask from "components/organisms/ProjectTask/ProjectTask";
import { useProject } from "hooks/useProject";
import { IColumn } from "types/types";
import { checkTaskOrder } from "utils/utils";
import { WrapperProjectColumnTasks, Wip } from "./ProjectColumnTasks.styles";

const ProjectColumnTasks = ({ column }: { column: IColumn }) => {
  const {
    doc,
    project: { columns, tasks },
  } = useProject();

  return (
    <WrapperProjectColumnTasks>
      {tasks
        .filter((task) => checkTaskOrder(task, column))
        .map((task, i) => (
          <Wip key={task.title + task.createdAt} wip={column.wip === i + 1}>
            <ProjectTask doc={doc} task={task} column={column} columns={columns} />
          </Wip>
        ))}
    </WrapperProjectColumnTasks>
  );
};

export default ProjectColumnTasks;
