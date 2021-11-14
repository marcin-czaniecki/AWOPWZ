import { DocumentReference } from "firebase/firestore";

export interface IMessage {
  id: string;
  uid: string;
  author: string;
  content: string;
  createdAt: { toDate: () => Date; seconds: number };
  updatedAt: { toDate: () => Date; seconds: number };
}
export interface IModal {
  active?: boolean;
  children: JSX.Element;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  closeAction: () => void;
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
  columnOrder: string;
  title: string;
  author: string;
}

export interface IColumn {
  id: string;
  order: string;
  name: string;
}

export interface IProject {
  name: string;
  columns: IColumn[];
  tasks: ITask[];
}

export type TypeUpdateOrder = (task: ITask, columns: IColumn[]) => string;
export type TypeMoveTask = (
  doc: DocumentReference<any>,
  task: ITask,
  columns: IColumn[],
  updateOrder: TypeUpdateOrder
) => Promise<void>;

export type TypeUpdateArray = <T extends unknown>(
  doc: DocumentReference<any>,
  FieldValue: string,
  oldVersionElements: T[],
  newVersionElements: T[]
) => void;

export type TArrayPushOneElement = <T extends unknown>(
  doc: DocumentReference<any>,
  FieldValue: string,
  value: T
) => void;