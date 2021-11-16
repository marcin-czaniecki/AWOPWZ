export enum enumName {
  COLUMNS = "columns",
  TASKS = "tasks",
  PROJECTS = "projects",
  USERS = "users",
  MESSAGE = "message",
}
export const generateId = () => Math.round(Math.random() * Math.pow(10, 10)).toString(16);
