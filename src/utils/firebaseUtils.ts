import fb, { store } from "data/fb";
import { updateDoc } from "firebase/firestore";
import { enumName, ArrayName } from "./utils";
import {
  ITask,
  IColumn,
  TypeUpdateArray,
  TypeColumnSwap,
  TypeArrayPush,
  TypeColumnMove,
  TypeColumnRemove,
  TypeMoveTask,
  TypeTasksChangeOrderZero,
  TypeUpdateOrderTask,
  TypeUpdateTasksFromTheColumn,
} from "types/types";
import StoreService from "data/StoreService";

export const updateTasksFromTheColumn: TypeUpdateTasksFromTheColumn = async (tasks, column, order) => {
  const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
  const updateTask = (task: ITask) => ({ ...task, columnOrder: typeof order === "number" ? order : task.columnOrder - 1 });
  const newVersionTasks = oldVersionTasks.map(updateTask);
  return newVersionTasks;
};

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

export const moveTask: TypeMoveTask = async (doc, task, columns, updateOrder) => {
  const updatingTask = { ...task };
  updatingTask.columnOrder = updateOrder(updatingTask, columns);

  if (updatingTask.columnOrder === task.columnOrder) {
    return;
  }
  StoreService.updateArray(enumName.TASKS, [task], [updatingTask], doc);
};

export const tasksChangeOrderZero: TypeTasksChangeOrderZero = async (doc, column, tasks) => {
  if (column.order !== 0) {
    const oldVersionTasks = tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = await updateTasksFromTheColumn(tasks, column, 0);
    StoreService.updateArray(ArrayName.TASKS, oldVersionTasks, newVersionTasks, doc);
  }
};

export const columnMove: TypeColumnMove = async (doc, column, tasks, delta = 1) => {
  const newOrder = column.order + delta;
  const equalOrder = ({ columnOrder }: ITask) => columnOrder === column.order;
  const oldVersionTasks = tasks.filter(equalOrder);
  const newVersionTasks = await updateTasksFromTheColumn(tasks, column, newOrder);
  StoreService.updateArray(ArrayName.TASKS, oldVersionTasks, newVersionTasks, doc);

  return { ...column, order: newOrder };
};

export const columnRemove: TypeColumnRemove = async (doc, column, columns, tasks) => {
  tasksChangeOrderZero(doc, column, tasks);
  const columnsHigherOrder = columns.filter(({ order }) => Number(order) > Number(column.order));
  const updateColumnOrder = async (column: IColumn) => await columnMove(doc, column, tasks, -1);
  const columnsWithUpdatedOrder = await Promise.all(columnsHigherOrder.map(updateColumnOrder));

  StoreService.updateArray(ArrayName.COLUMNS, [column, ...columnsHigherOrder], columnsWithUpdatedOrder, doc);
};

export const columnSwap: TypeColumnSwap = async (doc, column, columns, tasks, delta = 1) => {
  const columnHigherOrder = columns.filter(({ order }) => order === column.order + delta)[0];
  const updateColumnHigherOrder = await columnMove(doc, columnHigherOrder, tasks, -1 * delta);
  const updateCurrentColumn = await columnMove(doc, column, tasks, delta);
  StoreService.updateArray(enumName.COLUMNS, [columnHigherOrder, column], [updateCurrentColumn, updateColumnHigherOrder], doc);
};
