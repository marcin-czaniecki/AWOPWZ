import { auth } from "fb/fb";
import { Timestamp } from "firebase/firestore";
import { FieldErrors } from "react-hook-form";
import { IColumn, ITask, IUser, TypeToast } from "types/types";

export enum CollectionsName {
  users = "users",
  messages = "messages",
  teams = "teams",
  projects = "projects",
}

export enum ArrayName {
  columns = "columns",
  members = "members",
  tasks = "tasks",
  permissions = "permissions",
  projects = "projects",
  pinnedProjects = "pinnedProjects",
}

export enum ConfirmModalButtonText {
  delete = "Usuń",
  edit = "Edytuj",
  pin = "Przypnij",
}

export enum ErrorMessage {
  default = "Niestety poszło coś nie tak.",
  mustBeAdmin = "Musisz być administratorem.",
  haventPermissions = "Nie posiadasz odpowiednich uprawnień.",
  noValue = "Zaszła pewna niezgodność z twoim kontem.",
}

export const generateId = () =>
  Math.round(Math.random() * Math.pow(10, 10)).toString(16);

export const checkTaskOrder = (task: ITask, column: IColumn) =>
  task.columnOrder === column.order;

export const wipToNumber = (wip: number | string) => {
  const isNumberWip = typeof wip === "number";
  let convertWip = isNumberWip ? wip : Number(wip);
  if (convertWip) {
    return convertWip;
  }
  return 0;
};

export const pathNameToArray = (pathname: string) =>
  pathname.split("/").filter((item) => item.length);

export const createTask = (
  title: string,
  color: string,
  backgroundColor: string,
  data: Date,
  responsibleName: string
): ITask => ({
  id: generateId(),
  title,
  author: auth?.currentUser?.email || auth?.currentUser?.uid || "unknown",
  color,
  backgroundColor,
  columnOrder: 0,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
  responsibleName: responsibleName,
  timeLimit: Timestamp.fromDate(data),
});

export const errorHandler = (
  fields: { [key: string]: string }[],
  setToast: (message: string, type?: TypeToast | undefined) => void
) => {
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
                setToast(
                  `Musisz wypełnić brakujące pole ${filed["label"] || ""}`,
                  "warning"
                );
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

export const arrayFieldUser: {
  content: string;
  key:
    | "isLeader"
    | "canServiceMember"
    | "canServiceProjects"
    | "canServiceColumns"
    | "canServiceTasks";
}[] = [
  { content: "Lider zespołu:", key: "isLeader" },
  { content: "Prawo nadawania uprawnień:", key: "canServiceMember" },
  { content: "Zarządzanie projektami:", key: "canServiceProjects" },
  { content: "Zarządzanie kolumnami?:", key: "canServiceColumns" },
  { content: "Zarządzanie zadaniami?:", key: "canServiceTasks" },
];

export const getNameUser = (dataUser: IUser | null | undefined) =>
  `${dataUser?.firstName} ${dataUser?.lastName}`;
