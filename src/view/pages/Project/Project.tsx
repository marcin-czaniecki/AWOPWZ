import { IColumn } from "types/types";
import ProjectColumn from "components/organisms/ProjectColumn/ProjectColumn";
import ButtonBack from "components/molecules/ButtonBack/ButtonBack";
import ProjectSidebar from "components/organisms/ProjectSidebar/ProjectSidebar";
import { WrapperColumns } from "./Project.styles";
import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";
import { EnumCollectionsName, createPath } from "utils/utils";
import ProjectChat from "components/organisms/ProjectChat/ProjectChat";

const Project = () => {
  const { doc, project, loading, error } = useProject();
  const pathMessages = createPath(EnumCollectionsName.PROJECTS, doc.id, EnumCollectionsName.MESSAGES);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  const sortOrder = (a: IColumn, b: IColumn) => (Number(a.order) > Number(b.order) ? 1 : -1);

  return (
    <>
      <ButtonBack path="/projects" />
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

export default Project;
