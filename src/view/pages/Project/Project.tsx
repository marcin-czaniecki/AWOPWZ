import fb, { store } from "data/fb";
import { DocumentReference } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { IProject } from "types/types";
import { useParams } from "react-router-dom";

const Project = () => {
  const { id } = useParams();
  const [data, loading, error] = useDocumentDataOnce<IProject>(
    fb.doc(store, "projects", id ? id : "unknown") as DocumentReference<IProject>
  );

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data || error) {
    return <div>Nie możemy wczytać tego projektu :/</div>;
  }

  return (
    <div>
      {data.columns.map((column) => {
        return (
          <div key={column.order + column.name}>
            <div>{column.name}</div>
            {data.tasks
              .filter((task) => {
                return task.column === column.name || (task.column === "unknown" && "0" === column.order);
              })
              .map((task) => {
                return (
                  <div key={task.title + task.createdAt}>
                    <div>{task.title}</div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Project;
