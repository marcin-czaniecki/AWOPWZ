import fb, { store } from "data/fb";
import { updateDoc } from "firebase/firestore";
import { TArrayPushOneElement, ITask, IColumn, TypeUpdateArray, TypeMoveTask } from "types/types";

export enum enumName {
  COLUMNS = "columns",
  TASKS = "tasks",
}

export const removeDoc = async (collection: string, id: string, setError: (alert: string | null) => void) => {
  try {
    await fb.deleteDoc(fb.doc(store, collection, id));
  } catch (e) {
    setError("Niestety nie możemy usunąć tego :c");
  }
};

export const generateId = () => Math.round(Math.random() * Math.pow(10, 10)).toString(16);

export const arrayPushOneElement: TArrayPushOneElement = async (doc, FieldValue, value) => {
  await updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(value),
  });
};

export const updateTasksOrderFromCurrentColumn = (tasks: ITask[], column: IColumn, order?: string) => {
  const oldVersionElements = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const newVersionElements = oldVersionElements.map((task) => {
    const updatingTask = { ...task };
    updatingTask.columnOrder = order || (Number(task.columnOrder) - 1).toString();
    return updatingTask;
  });
  return newVersionElements;
};

export const updateArray: TypeUpdateArray = async (doc, FieldValue, oldVersionElements, newVersionElements) => {
  updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(...newVersionElements),
  });
  await updateDoc(doc, {
    [FieldValue]: fb.arrayRemove(...oldVersionElements),
  });
};

export const moveTask: TypeMoveTask = async (doc, task, columns, updateOrder) => {
  const updatingTask = { ...task };
  updatingTask.columnOrder = updateOrder(updatingTask, columns);

  if (updatingTask.columnOrder === task.columnOrder) {
    return;
  }
  updateArray(doc, enumName.TASKS, [task], [updatingTask]);
};
export const upOrderTask = (task: ITask, columns: IColumn[]) => {
  if (parseInt(task.columnOrder) < parseInt(columns[columns.length - 1].order)) {
    return (parseInt(task.columnOrder) + 1).toString();
  }
  return task.columnOrder;
};
export const downOrderTask = (task: ITask, columns: IColumn[]) => {
  if (parseInt(task.columnOrder) > parseInt(columns[0].order)) {
    return (parseInt(task.columnOrder) - 1).toString();
  }
  return task.columnOrder;
};
