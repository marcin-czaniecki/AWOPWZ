import { DocumentReference } from "firebase/firestore";

export interface IMessage {
  id: string;
  uid: string;
  author: string;
  content: string;
  createdAt: { toDate: () => Date; seconds: number };
  updatedAt: { toDate: () => Date; seconds: number };
}

export interface ITask {
  id: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  color: string;
  backgroundColor: string;
  columnOrder: number;
  title: string;
  author: string;
}

export interface IColumn {
  id: string;
  name: string;
  order: number;
  wip: number;
}

export interface IProject {
  name: string;
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

export interface IUser {
  uid: string;
  isAdmin: boolean;
  verifiedByAdmin: boolean;
  firstName?: string;
  lastName?: string;
  profession?: string;
}

export type TypeToast = "primary" | "secondary" | "default" | "success" | "warning" | "info";

/* FirebaseUtils */

export type TypeRemoveDoc = (id: string, collection: string) => Promise<void>;

export type TypeArrayPush = <T extends unknown>(doc: DocumentReference<any>, FieldValue: string, value: T) => Promise<void>;

export type TypeUpdateTasksFromTheColumn = (tasks: ITask[], column: IColumn, order?: number) => Promise<ITask[]>;

export type TypeUpdateOrderTask = (task: ITask, columns: IColumn[]) => number;

export type TypeMoveTask = (
  doc: DocumentReference<any>,
  task: ITask,
  columns: IColumn[],
  updateOrder: TypeUpdateOrderTask
) => Promise<void>;

export type TypeTasksChangeOrderZero = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[]) => void;

export type TypeColumnMove = (doc: DocumentReference<IProject>, column: IColumn, tasks: ITask[], delta: number) => Promise<IColumn>;

export type TypeColumnRemove = (doc: DocumentReference<IProject>, column: IColumn, columns: IColumn[], tasks: ITask[]) => Promise<void>;

export type TypeColumnSwap = (
  doc: DocumentReference<IProject>,
  column: IColumn,
  columns: IColumn[],
  tasks: ITask[],
  delta: number
) => Promise<void>;
