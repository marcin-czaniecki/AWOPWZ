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
export interface IProject {
  name: string;
  columns: {
    order: string;
    name: string;
  }[];
  tasks: {
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
    updatedAt: {
      seconds: number;
      nanoseconds: number;
    };
    color: string;
    column: string;
    title: string;
    author: string;
  }[];
}
