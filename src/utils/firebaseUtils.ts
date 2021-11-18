import fb, { store } from "data/fb";
import { DocumentReference, updateDoc } from "firebase/firestore";
import { ITask, IColumn, TypeUpdateArray, IProject } from "types/types";
import { enumName, EnumNameOfProjectArrays } from "./utils";

type TypeRemoveDoc = (id: string, collection: string) => Promise<void>;

export const removeDoc: TypeRemoveDoc = async (id, collection) => {
  fb.deleteDoc(fb.doc(store, collection, id));
};

type TypeArrayPush = <T extends unknown>(doc: DocumentReference<any>, FieldValue: string, value: T) => Promise<void>;

export const arrayPush: TypeArrayPush = async (doc, FieldValue, value) => {
  updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(value),
  });
};

type TypeUpdateTasksFromTheColumn = (tasks: ITask[], column: IColumn, order?: number) => Promise<ITask[]>;

export const updateTasksFromTheColumn: TypeUpdateTasksFromTheColumn = async (tasks, column, order) => {
  const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const updateTask = (task: ITask) => ({ ...task, columnOrder: typeof order === "number" ? order : task.columnOrder - 1 });
  const newVersionTasks = oldVersionTasks.map(updateTask);
  return newVersionTasks;
};

export const updateArray: TypeUpdateArray = async (doc, FieldValue, oldVersionElements, newVersionElements) => {
  await updateDoc(doc, {
    [FieldValue]: fb.arrayRemove(...oldVersionElements),
  });
  await updateDoc(doc, {
    [FieldValue]: fb.arrayUnion(...newVersionElements),
  });
};

type TypeUpdateOrderTask = (task: ITask, columns: IColumn[]) => number;

export const upOrderTask: TypeUpdateOrderTask = (task, columns) => {
  if (task.columnOrder < columns[columns.length - 1].order) {
    return task.columnOrder + 1;
  }
  return task.columnOrder;
};

export const downOrderTask: TypeUpdateOrderTask = (task, columns) => {
  if (task.columnOrder > columns[0].order) {
    return task.columnOrder - 1;
  }
  return task.columnOrder;
};

export type TypeMoveTask = (
  doc: DocumentReference<any>,
  task: ITask,
  columns: IColumn[],
  updateOrder: TypeUpdateOrderTask
) => Promise<void>;

export const moveTask: TypeMoveTask = async (doc, task, columns, updateOrder) => {
  const updatingTask = { ...task };
  updatingTask.columnOrder = updateOrder(updatingTask, columns);

  if (updatingTask.columnOrder === task.columnOrder) {
    return;
  }
  updateArray(doc, enumName.TASKS, [task], [updatingTask]);
};

type TypeTasksChangeOrderZero = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[]) => void;

export const tasksChangeOrderZero: TypeTasksChangeOrderZero = async (doc, column, tasks) => {
  if (column.order !== 0) {
    const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = await updateTasksFromTheColumn(tasks, column, 0);
    updateArray(doc, EnumNameOfProjectArrays.TASKS, oldVersionTasks, newVersionTasks);
  }
};

type TypeColumnMove = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[], delta: number) => Promise<IColumn>;

export const columnMove: TypeColumnMove = async (doc, column, tasks, delta = 1) => {
  const newOrder = column.order + delta;
  const equalOrder = ({ columnOrder }: ITask) => columnOrder === column.order;
  const oldVersionTasks = tasks.filter(equalOrder);
  const newVersionTasks = await updateTasksFromTheColumn(tasks, column, newOrder);
  updateArray(doc, EnumNameOfProjectArrays.TASKS, oldVersionTasks, newVersionTasks);

  return { ...column, order: newOrder };
};

type TypeColumnRemove = (doc: DocumentReference<IProject>, column: IColumn, columns: IColumn[], tasks: ITask[]) => Promise<void>;

export const columnRemove: TypeColumnRemove = async (doc, column, columns, tasks) => {
  tasksChangeOrderZero(doc, column, tasks);
  const columnsHigherOrder = columns.filter(({ order }) => Number(order) > Number(column.order));
  const updateColumnOrder = async (column: IColumn) => await columnMove(doc, column, tasks, -1);
  const columnsWithUpdatedOrder = await Promise.all(columnsHigherOrder.map(updateColumnOrder));

  updateArray(doc, EnumNameOfProjectArrays.COLUMNS, [column, ...columnsHigherOrder], columnsWithUpdatedOrder);
};

type TypeColumnSwap = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  columns: IColumn[],
  tasks: ITask[],
  delta: number
) => Promise<void>;

export const columnSwap: TypeColumnSwap = async (doc, column, columns, tasks, delta = 1) => {
  const columnHigherOrder = columns.filter(({ order }) => order === column.order + delta)[0];
  const updateColumnHigherOrder = await columnMove(doc, columnHigherOrder, tasks, -1 * delta);
  const updateCurrentColumn = await columnMove(doc, column, tasks, delta);
  updateArray(doc, enumName.COLUMNS, [columnHigherOrder, column], [updateCurrentColumn, updateColumnHigherOrder]);
};
