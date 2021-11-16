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

export type TypeUpdateOrder = (task: ITask, columns: IColumn[]) => number;
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

export interface PropsProjectColumn {
  doc: DocumentReference<IProject>;
  column: IColumn;
  tasks: ITask[];
  columns: IColumn[];
}

export interface PropsConfirmModal {
  textButton: string;
  children: string | JSX.Element;
  confirmAction?: () => void;
  buttonVersion?: "secondary" | "tertiary";
  maxHeight?: string;
  maxWidth?: string;
  invisibleYes?: boolean;
  invisibleNo?: boolean;
}

export interface PropsProjectTask {
  doc: DocumentReference<IProject>;
  task: ITask;
  column: IColumn;
  columns: IColumn[];
}

export interface PropsColumnForm {
  doc: DocumentReference<IProject>;
  column?: IColumn;
  lastOrder?: number;
  length?: number;
}

export interface PropsTaskFormAndColumnFromSidebar {
  doc: DocumentReference<IProject>;
  lastOrder: number;
  length: number;
}

export interface IUser {
  uid: string;
  isAdmin: boolean;
  verifiedByAdmin: boolean;
  firstName?: string;
  lastName?: string;
  profession?: string;
}
