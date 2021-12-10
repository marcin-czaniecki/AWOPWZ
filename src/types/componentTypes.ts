import { DocumentReference } from "firebase/firestore";
import { ReactChild } from "react";
import {
  UseFormRegister,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { IProject, ITask, IColumn, IMessage, IUser, IPermissions } from "./types";

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

export interface IFormModalProps extends IChild {
  textButton: string;
  maxHeight?: string;
  maxWidth?: string;
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
  top?: boolean;
}

export interface IMessageProps extends IMessage {
  path: string;
}

export interface IFormField {
  name: string;
  type: string;
  label: string;
  defaultValue?: any;
  selectOptions?: any[];
  [key: string]: any;
}

export interface IForm<T> {
  clear?: boolean;
  contentButton?: string;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  fields: IFormField[];
}

export interface IInstructionProps {
  introduction: string;
  title: string;
  steps: string[];
}

export interface IProjectHeaderProps {
  pinnedProject: {
    name: string;
    ref: DocumentReference<IProject>;
  } | null;
  setPinnedProject: (
    pinnedProject: {
      name: string;
      ref: DocumentReference<IProject>;
    } | null
  ) => void;
}

export interface ISwitchButtonsProps {
  isVisibleLeftButton?: boolean;
  isVisibleRightButton?: boolean;
  actionLeftButton: () => void;
  actionRightButton: () => void;
}

export interface ICardProps {
  to: string;
  color?: string;
  children: ReactChild;
  kebabMenuChildren: ReactChild | ReactChild[];
}

export interface IDetalisProps {
  summary?: string;
  children: ReactChild | ReactChild[];
}

export interface IProjectCardProps {
  id: string;
  teamId: string;
  name: string;
}

export interface ITeamCardProps {
  name: string;
  teamId: string;
  members: DocumentReference<IUser>[];
}

export interface IAdditionBarProps {
  right?: boolean;
  children: ReactChild;
}

export interface IChatProps {
  path: string;
}

export interface IFieldUserWithPermissionProps {
  isPermission?: boolean;
  children: string;
  updatedUserUid: string;
  fieldValue: string;
  value?: boolean;
  permissions: IPermissions;
}

export interface IHoverIconProps {
  letter: string;
  children?: ReactChild;
}

export interface IListProps<T> {
  array: T[];
  callbackfn: (value: T, index: number, array: T[]) => JSX.Element;
  WrapperList: (props: { children: JSX.Element | JSX.Element[] }) => JSX.Element;
}

export interface ILoading {
  size?: string;
}

export interface IRequiredPermissionsProps {
  booleanPermissions: boolean[];
  children: ReactChild;
}

export interface ISelectProps<T> {
  field: IFormField;
  register: UseFormRegister<T>;
}

export interface IDateFieldProps {
  previousText?: string;
  autoMarginLeft?: boolean;
  showCalendar?: boolean;
  dateAt: {
    toDate: () => Date;
    seconds: number;
  };
}
