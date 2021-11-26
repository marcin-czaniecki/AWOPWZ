import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";
import { IColumn } from "types/types";
import { createPath, EnumCollectionsName } from "utils/utils";
import ProjectChat from "../ProjectChat/ProjectChat";
import ProjectColumn from "../ProjectColumn/ProjectColumn";
import ProjectSidebar from "../ProjectSidebar/ProjectSidebar";
import { WrapperColumns } from "./ProjectBody.styles";

const ProjectBody = () => {
  const { doc, project, loading, error } = useProject();
  const sortOrder = (a: IColumn, b: IColumn) => (Number(a.order) > Number(b.order) ? 1 : -1);
  const pathMessages = createPath(EnumCollectionsName.PROJECTS, doc.id, EnumCollectionsName.MESSAGES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <ProjectSidebar lastOrder={project.columns[project.columns.length - 1]?.order || 0} length={project.columns.length} />
      <WrapperColumns>
        {project.columns.sort(sortOrder).map((column) => (
          <ProjectColumn key={column.name + column.id + column.order + column.wip} column={column} />
        ))}
      </WrapperColumns>
      <ProjectChat name={project.name} path={pathMessages} />
    </>
  );
};
export default ProjectBody;
