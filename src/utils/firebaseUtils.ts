import fb, { store } from "data/fb";
import { CollectionReference, DocumentReference, updateDoc } from "firebase/firestore";
import { TArrayPushOneElement, ITask, IColumn, TypeUpdateArray, TypeMoveTask, IProject, IUser } from "types/types";
import { enumName } from "./utils";

export const collectionReferenceProject = fb.collection(store, enumName.PROJECTS);
export const collectionReferenceUsers = fb.collection(store, enumName.USERS) as CollectionReference<IUser>;

export const getDocumentReferenceProject = (id: string) => fb.doc(store, enumName.PROJECTS, id);
export const getDocumentReference = (collection: string, id: string) => fb.doc(store, collection, id);

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

export const updateTasksOrderFromCurrentColumn = (tasks: ITask[], column: IColumn, order?: number) => {
  const oldVersionElements = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const newVersionElements = oldVersionElements.map((task) => {
    const updatingTask = { ...task };
    updatingTask.columnOrder = typeof order === "number" ? order : task.columnOrder - 1;
    return updatingTask;
  });
  return newVersionElements;
};

export const updateArray: TypeUpdateArray = async (doc, FieldValue, oldVersionElements, newVersionElements) => {
  await updateDoc(doc, {
    [FieldValue]: fb.arrayRemove(...oldVersionElements),
  });
  await updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(...newVersionElements),
  });
};

export const upOrderTask = (task: ITask, columns: IColumn[]) => {
  if (task.columnOrder < columns[columns.length - 1].order) {
    return task.columnOrder + 1;
  }
  return task.columnOrder;
};
export const downOrderTask = (task: ITask, columns: IColumn[]) => {
  if (task.columnOrder > columns[0].order) {
    return task.columnOrder - 1;
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
  if (column.order !== 0) {
    const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = updateTasksOrderFromCurrentColumn(tasks, column, 0);
    updateArray(doc, enumName.TASKS, oldVersionTasks, newVersionTasks);
  }
};

export const columnMove: TypeColumnMove = (doc, column, tasks, delta = 1) => {
  const newOrder = column.order + delta;
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
  const columnHigherOrder = columns.filter(({ order }) => order === column.order + delta)[0];
  const updateColumnHigherOrder = columnMove(doc, columnHigherOrder, tasks, -1 * delta);
  const updateCurrentColumn = columnMove(doc, column, tasks, delta);
  updateArray(doc, enumName.COLUMNS, [columnHigherOrder, column], [updateCurrentColumn, updateColumnHigherOrder]);
};
export const checkTaskOrder = (task: ITask, column: IColumn) => task.columnOrder === column.order;
