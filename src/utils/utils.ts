import { auth } from "data/fb";
import { Timestamp } from "firebase/firestore";
import { FieldErrors } from "react-hook-form";
import { IColumn, ITask, TypeToast } from "types/types";


export enum CollectionsName {
  USERS = "users",
  MESSAGES = "messages",
  PROJECTS = "projects",
}

export enum ArrayName {
  columns = "columns",
  tasks = "tasks",
  pinnedProjects = "pinnedProjects",
}

export const generateId = () => Math.round(Math.random() * Math.pow(10, 10)).toString(16);

export const checkTaskOrder = (task: ITask, column: IColumn) => task.columnOrder === column.order;

export const wipToNumber = (wip: number | string) => {
  const isNumberWip = typeof wip === "number";
  let convertWip = isNumberWip ? wip : Number(wip);
  if (convertWip) {
    return convertWip;
  }
  return 0;
};

export const pathNameToArray = (pathname: string) => pathname.split("/").filter((item) => item.length);

export const createTask = (title: string, color: string, backgroundColor: string) => ({
  id: generateId(),
  title,
  author: auth?.currentUser?.email || auth?.currentUser?.uid,
  color,
  backgroundColor,
  columnOrder: 0,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
});

export const errorHandler = (fields: { [key: string]: string }[], setToast: (message: string, type?: TypeToast | undefined) => void) => {
  const onError = (errors: FieldErrors) => {
    let time = 0;
    fields.forEach((filed) => {
      let k: keyof typeof errors;
      let y: keyof typeof filed;
      for (y in filed) {
        for (k in errors) {
          const e = errors[k];
          if (filed[y] === k) {
            if (e?.type === "required") {
              setToast(``, "warning");
              setTimeout(() => {
                setToast(`Musisz wypełnić brakujące pole ${filed["label"] || ""}`, "warning");
              }, time);
              time += 4100;
            }
          }
        }
      }
    });
  };
  return onError;
};

export const createPath = (...pathSegments: string[]) => {
  let path = "";
  pathSegments.forEach((pathSegment) => {
    if (pathSegment[0] !== "/") {
      path += `/`;
    }
    path += `${pathSegment}`;
  });
  return path;
};
