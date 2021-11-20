import { DocumentReference } from "firebase/firestore";
import { ReactChild } from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { IProject, ITask, IColumn } from "./types";

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
  doc: DocumentReference<IProject>;
  column?: IColumn;
  lastOrder?: number;
  length?: number;
}

export interface ITaskFormAndColumnFromSidebarProps {
  doc: DocumentReference<IProject>;
  lastOrder: number;
  length: number;
}

export interface IFiledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
}

export interface IKebabMenuProps {
  color?: string;
  children: ReactChild | ReactChild[];
}
