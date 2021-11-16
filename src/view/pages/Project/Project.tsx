import { DocumentReference } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { IColumn, IProject } from "types/types";
import { useParams } from "react-router-dom";
import ProjectColumn from "components/organisms/ProjectColumn/ProjectColumn";
import { getDocumentReferenceProject } from "utils/firebaseUtils";
import ButtonBack from "components/molecules/ButtonBack/ButtonBack";
import TaskFormAndColumnFromSidebar from "components/organisms/TaskFormAndColumnFromSidebar/TaskFormAndColumnFromSidebar";
import { WrapperColumns } from "./Project.styles";
import Loading from "components/molecules/Loading/Loading";

const Project = () => {
  const { id } = useParams();
  const doc = getDocumentReferenceProject(id || "unknown") as DocumentReference<IProject>;
  const [data, loading, error] = useDocumentData<IProject>(doc);

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
        lastOrder={data?.columns[data.columns.length - 1]?.order || "0"}
        length={data.columns.length}
      />
      <WrapperColumns>
        {data.columns.sort(sortOrder).map((column) => (
          <ProjectColumn
            key={column.id + column.order}
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
