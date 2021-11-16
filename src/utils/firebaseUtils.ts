import fb, { store } from "data/fb";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { TArrayPushOneElement, ITask, IColumn, TypeUpdateArray, TypeMoveTask, IProject } from "types/types";
import { enumName } from "./utils";

export const collectionReferenceProject = fb.collection(store, enumName.PROJECTS);

export const getDocumentReferenceProject = (id: string) => fb.doc(store, enumName.PROJECTS, id);

export const removeDoc = async (collection: string, id: string, setError: (alert: string | null) => void) => {
  try {
    await fb.deleteDoc(fb.doc(store, collection, id));
  } catch (e) {
    setError("Niestety nie możemy usunąć tego :c");
  }
};

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

export const moveTask: TypeMoveTask = async (doc, task, columns, updateOrder) => {
  const updatingTask = { ...task };
  updatingTask.columnOrder = updateOrder(updatingTask, columns);

  if (updatingTask.columnOrder === task.columnOrder) {
    return;
  }
  updateArray(doc, enumName.TASKS, [task], [updatingTask]);
};

type TypeMoveAllTaskToOrderColumn0 = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[]) => void;
type TypeColumnMove = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[], delta: number) => IColumn;

type TypeColumnRemove = (doc: DocumentReference<IProject>, column: IColumn, columns: IColumn[], tasks: ITask[]) => void;
type TypeColumnSwap = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  columns: IColumn[],
  tasks: ITask[],
  delta: number
) => void;
export const moveAllTaskToOrderColumn0: TypeMoveAllTaskToOrderColumn0 = (doc, column, tasks) => {
  if (column.order !== "0") {
    const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = updateTasksOrderFromCurrentColumn(tasks, column, "0");
    updateArray(doc, enumName.TASKS, oldVersionTasks, newVersionTasks);
  }
};

export const columnMove: TypeColumnMove = (doc, column, tasks, delta = 1) => {
  const newOrder = (Number(column.order) + delta).toString();
  const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const newVersionTasks = updateTasksOrderFromCurrentColumn(tasks, column, newOrder);
  updateArray(doc, enumName.TASKS, oldVersionTasks, newVersionTasks);

  const updatingColumn = { ...column };
  updatingColumn.order = newOrder;

  return updatingColumn;
};

export const columnRemove: TypeColumnRemove = (doc, column, columns, tasks) => {
  moveAllTaskToOrderColumn0(doc, column, tasks);
  const columnsHigherOrder = columns.filter(({ order }) => Number(order) > Number(column.order));
  const columnsWithUpdatedOrder = columnsHigherOrder.map((column) => columnMove(doc, column, tasks, -1));

  updateArray(doc, enumName.COLUMNS, [column, ...columnsHigherOrder], columnsWithUpdatedOrder);
};

export const columnSwap: TypeColumnSwap = (doc, column, columns, tasks, delta = 1) => {
  const columnHigherOrder = columns.filter(({ order }) => Number(order) === Number(column.order) + delta)[0];
  const updateColumnHigherOrder = columnMove(doc, columnHigherOrder, tasks, -1 * delta);
  const updateCurrentColumn = columnMove(doc, column, tasks, delta);
  updateArray(doc, enumName.COLUMNS, [columnHigherOrder, column], [updateCurrentColumn, updateColumnHigherOrder]);
};
export const checkTaskOrder = (task: ITask, column: IColumn) => task.columnOrder === column.order;
