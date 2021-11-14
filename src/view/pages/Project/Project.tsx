import fb, { auth, store } from "data/fb";
import { arrayRemove, arrayUnion, DocumentReference, Timestamp, updateDoc } from "firebase/firestore";
import { useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { IColumn, IProject, ITask, TArrayPushOneElement, TypeMoveTask, TypeUpdateArray } from "types/types";
import { useParams } from "react-router-dom";
import SideBar from "components/molecules/SideBar/SideBar";
import styled from "styled-components";

/* 

export interface ITask {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  color: string;
  column: string;
  title: string;
  author: string;
}

export interface IColumn {
  order: string;
  name: string;
}

export interface IProject {
  name: string;
  columns: IColumn[];
  tasks: ITask[];
}

*/
const generateId = () => Math.round(Math.random() * Math.pow(10, 10)).toString(16);

const arrayPushOneElement: TArrayPushOneElement = async (doc, FieldValue, value) => {
  await updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(value),
  });
};

const updateTasksOrderFromCurrentColumn = (tasks: ITask[], column: IColumn, order?: string) => {
  const oldVersionElements = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const newVersionElements = oldVersionElements.map((task) => {
    const updatingTask = { ...task };
    updatingTask.columnOrder = order || (Number(task.columnOrder) - 1).toString();
    return updatingTask;
  });
  return newVersionElements;
};

const updateArray: TypeUpdateArray = async (doc, FieldValue, oldVersionElements, newVersionElements) => {
  updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(...newVersionElements),
  });
  await updateDoc(doc, {
    [FieldValue]: fb.arrayRemove(...oldVersionElements),
  });
};

const moveTask: TypeMoveTask = async (doc, task, columns, updateOrder) => {
  const updatingTask = { ...task };
  updatingTask.columnOrder = updateOrder(updatingTask, columns);

  if (updatingTask.columnOrder === task.columnOrder) {
    return;
  }
  updateArray(doc, "tasks", [task], [updatingTask]);
};
const upOrderTask = (task: ITask, columns: IColumn[]) => {
  if (parseInt(task.columnOrder) < parseInt(columns[columns.length - 1].order)) {
    return (parseInt(task.columnOrder) + 1).toString();
  }
  return task.columnOrder;
};
const downOrderTask = (task: ITask, columns: IColumn[]) => {
  if (parseInt(task.columnOrder) > parseInt(columns[0].order)) {
    return (parseInt(task.columnOrder) - 1).toString();
  }
  return task.columnOrder;
};
const EditBar = ({
  doc,
  lastOrder,
  length,
}: {
  doc: DocumentReference<IProject>;
  lastOrder: string;
  length: number;
}) => {
  const AddColumn = async () => {
    arrayPushOneElement(doc, "columns", {
      id: generateId(),
      name: "Przykładowa tablica",
      order: `${length > 0 ? Number(lastOrder) + 1 : 0}`,
    });
  };

  return (
    <SideBar right>
      <div>
        <button
          onClick={async () => {
            if (!auth.currentUser) {
              return;
            }

            await updateDoc(doc, {
              tasks: fb.arrayUnion({
                id: generateId(),
                title: `Przykładowe zadanie ${Math.round(Math.random() * 10)}`,
                author: auth.currentUser.email || auth.currentUser.uid,
                color: `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
                  Math.random() * 255
                )})`,
                backgroundColor: `rgb(${Math.round(Math.random() * 255)},${Math.round(
                  Math.random() * 255
                )},${Math.round(Math.random() * 255)})`,
                columnOrder: "0",
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              }),
            });
          }}
        >
          Dodaj zadanie
        </button>
        <button onClick={AddColumn}>Dodaj kolumne</button>
      </div>
    </SideBar>
  );
};

const ModalAddTask = () => {};

const WrapperColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const Project = () => {
  const { id } = useParams();
  const doc = fb.doc(store, "projects", id || "unknown") as DocumentReference<IProject>;
  const [data, loading, error] = useDocumentData<IProject>(doc);
  if (loading) {
    return <div>loading...</div>;
  }

  if (!data || error) {
    return <div>Nie możemy wczytać tego projektu :/</div>;
  }

  return (
    <>
      <EditBar
        doc={doc}
        lastOrder={data?.columns[data.columns.length - 1]?.order || "0"}
        length={data.columns.length}
      />
      <WrapperColumns>
        {data.columns
          .sort((a, b) => (Number(a.order) > Number(b.order) ? 1 : -1))
          .map((column) => {
            const filterFn = (task: ITask) => task.columnOrder === column.order;
            return (
              <div key={column.id + column.order + column.name}>
                <div>
                  {column.name} : {column.order}
                  <button
                    onClick={async () => {
                      if (column.order !== "0") {
                        const oldVersionTasks = data.tasks.filter(({ columnOrder }) => columnOrder === column.order);
                        const newVersionTasks = updateTasksOrderFromCurrentColumn(data.tasks, column, "0");
                        updateArray(doc, "tasks", oldVersionTasks, newVersionTasks);
                      }
                      const columnsHigherOrder = [
                        ...data.columns.filter(({ order }) => Number(order) > Number(column.order)),
                      ];
                      const columnsWithUpdatedOrder = columnsHigherOrder.map((column) => {
                        const oldVersionTasks = data.tasks.filter(({ columnOrder }) => columnOrder === column.order);
                        const newVersionTasks = updateTasksOrderFromCurrentColumn(data.tasks, column);
                        updateArray(doc, "tasks", oldVersionTasks, newVersionTasks);

                        const updatingColumn = { ...column };
                        updatingColumn.order = (Number(updatingColumn.order) - 1).toString();
                        return updatingColumn;
                      });

                      updateArray(doc, "columns", [column, ...columnsHigherOrder], columnsWithUpdatedOrder);
                    }}
                  >
                    usuń
                  </button>
                </div>
                {data.tasks.filter(filterFn).map((task) => (
                  <div
                    key={task.title + task.createdAt}
                    style={{ background: task.color, color: task.backgroundColor }}
                  >
                    <div>
                      <div>{task.title}</div>
                      <div>
                        {
                          <button
                            onClick={async () => {
                              await updateDoc(doc, {
                                tasks: fb.arrayRemove(task),
                              });
                            }}
                          >
                            usuń
                          </button>
                        }
                        <button onClick={() => moveTask(doc, task, data.columns, downOrderTask)}>cofnij</button>
                        <button onClick={() => moveTask(doc, task, data.columns, upOrderTask)}>ukończono</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
      </WrapperColumns>
    </>
  );
};

export default Project;
