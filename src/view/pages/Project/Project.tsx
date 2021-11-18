import { IColumn } from "types/types";
import ProjectColumn from "components/organisms/ProjectColumn/ProjectColumn";
import ButtonBack from "components/molecules/ButtonBack/ButtonBack";
import TaskFormAndColumnFromSidebar from "components/organisms/TaskFormAndColumnFromSidebar/TaskFormAndColumnFromSidebar";
import { WrapperColumns } from "./Project.styles";
import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";

const Project = () => {
  const { doc, project, loading, error } = useProject();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  const sortOrder = (a: IColumn, b: IColumn) => (Number(a.order) > Number(b.order) ? 1 : -1);

  return (
    <>
      <ButtonBack />
      <TaskFormAndColumnFromSidebar
        doc={doc}
        lastOrder={project.columns[project.columns.length - 1]?.order || 0}
        length={project.columns.length}
      />
      <WrapperColumns>
        {project.columns.sort(sortOrder).map((column) => (
          <ProjectColumn key={column.name + column.id + column.order + column.wip} column={column} />
        ))}
      </WrapperColumns>
    </>
  );
};

export default Project;
