import { DocumentReference, Timestamp } from "firebase/firestore";

export interface IMessage {
  id: string;
  uid: string;
  author: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ITask {
  id: string;
  color: string;
  title: string;
  author: string;
  backgroundColor: string;
  responsibleName?: string;
  columnOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  timeLimit: Timestamp;
}

export interface IColumn {
  id: string;
  name: string;
  order: number;
  wip: number;
}

export interface IProject {
  name: string;
  teamId: string;
  columns: IColumn[];
  tasks: ITask[];
}

export type TypeUpdateArray = <T extends unknown>(
  doc: DocumentReference<any>,
  FieldValue: string,
  oldVersionElements: T[],
  newVersionElements: T[]
) => void;

export interface PropsProjectColumn {
  doc: DocumentReference<IProject>;
  column: IColumn;
  tasks: ITask[];
  columns: IColumn[];
}
export interface IPinnedProject {
  name: string;
  ref: DocumentReference<IProject>;
}

export interface IPermissions {
  id: string;
  isLeader: boolean;
  canServiceTasks: boolean;
  canServiceColumns: boolean;
  canServiceProjects: boolean;
  canServiceMember: boolean;
}

export interface IUser {
  uid: string;
  isAdmin: boolean;
  verifiedByAdmin: boolean;
  firstName: string;
  lastName: string;
  profession: string;
  pinnedProjects?: IPinnedProject[];
  permissions: IPermissions[];
}

export interface ITeam {
  author: string;
  name: string;
  members: DocumentReference<any>[];
}

export type TypeToast = "primary" | "secondary" | "default" | "success" | "warning" | "info";

/* FirebaseUtils */

export type TypeRemoveDoc = (id: string, collection: string) => Promise<void>;

export type TypeArrayPush = <T extends unknown>(
  doc: DocumentReference<any>,
  FieldValue: string,
  value: T
) => Promise<void>;

export type TypeUpdateTasksFromTheColumn = (
  tasks: ITask[],
  column: IColumn,
  order?: number
) => Promise<ITask[]>;

export type TypeUpdateOrderTask = (task: ITask, columns: IColumn[]) => number;

export type TypeMoveTask = (
  doc: DocumentReference<any>,
  task: ITask,
  columns: IColumn[],
  updateOrder: TypeUpdateOrderTask
) => Promise<void>;

export type TypeTasksChangeOrderZero = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  tasks: ITask[]
) => void;

export type TypeColumnMove = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  tasks: ITask[],
  delta: number
) => Promise<IColumn>;

export type TypeColumnRemove = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  columns: IColumn[],
  tasks: ITask[]
) => Promise<void>;

export type TypeColumnSwap = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  columns: IColumn[],
  tasks: ITask[],
  delta: number
) => Promise<void>;

export interface IView {
  to?: string | null;
  text?: string | null;
  path: string;
  element: JSX.Element;
}
