import { DocumentReference } from "firebase/firestore";
import { ReactChild } from "react";
import { UseFormRegister, RegisterOptions, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { IProject, ITask, IColumn, IMessage } from "./types";

export interface IChild {
  children: ReactChild;
}

export interface IModalProps extends IChild {
  active?: boolean;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  closeAction: () => void;
}

export interface IModalConfirmProps extends IChild {
  textButton: string;
  confirmAction?: () => void;
  maxHeight?: string;
  maxWidth?: string;
  invisibleYes?: boolean;
  invisibleNo?: boolean;
}

export interface IProjectTaskProps {
  doc: DocumentReference<IProject>;
  task: ITask;
  column: IColumn;
  columns: IColumn[];
}

export interface IColumnFormProps {
  column?: IColumn;
  lastOrder?: number;
  length?: number;
}

export interface IProjectSidebarProps {
  lastOrder: number;
  length: number;
}

export interface IFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
}

export interface IKebabMenuProps {
  color?: string;
  children: ReactChild | ReactChild[];
}

export interface IMessageProps extends IMessage {
  path: string;
}

export interface IForm<T> {
  clear?: boolean;
  contentButton?: string;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  fields: { name: string; type: string; label: string; defaultValue?: any; [key: string]: any }[];
}
