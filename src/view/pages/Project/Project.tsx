import { IColumn } from "types/types";
import ProjectColumn from "components/organisms/ProjectColumn/ProjectColumn";
import ButtonBack from "components/molecules/ButtonBack/ButtonBack";
import TaskFormAndColumnFromSidebar from "components/organisms/TaskFormAndColumnFromSidebar/TaskFormAndColumnFromSidebar";
import { WrapperColumns } from "./Project.styles";
import Loading from "components/molecules/Loading/Loading";
import { useProject } from "hooks/useProject";

const Project = () => {
  const { doc, data, loading, error } = useProject();

  if (loading) {
    return <Loading />;
  }

  if (!data || error) {
    return <div>Nie możemy wczytać tego projektu :/</div>;
  }

  const sortOrder = (a: IColumn, b: IColumn) => (Number(a.order) > Number(b.order) ? 1 : -1);

  return (
    <>
      <ButtonBack />
      <TaskFormAndColumnFromSidebar
        doc={doc}
        lastOrder={data.columns[data.columns.length - 1]?.order || 0}
        length={data.columns.length}
      />
      <WrapperColumns>
        {data.columns.sort(sortOrder).map((column) => (
          <ProjectColumn
            key={column.name + column.id + column.order + column.wip}
            doc={doc}
            tasks={data.tasks}
            column={column}
            columns={data.columns}
          />
        ))}
      </WrapperColumns>
    </>
  );
};

export default Project;
