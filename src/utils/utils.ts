import { ITask, IColumn } from "types/types";

export enum enumName {
  COLUMNS = "columns",
  TASKS = "tasks",
  PROJECTS = "projects",
  USERS = "users",
  MESSAGE = "message",
}

export enum EnumCollectionsName {
  USERS = "users",
  MESSAGES = "messages",
  PROJECTS = "projects",
}

export enum EnumNameOfProjectArrays {
  COLUMNS = "columns",
  TASKS = "tasks",
}

export const generateId = () => Math.round(Math.random() * Math.pow(10, 10)).toString(16);

export const checkTaskOrder = (task: ITask, column: IColumn) => task.columnOrder === column.order;
