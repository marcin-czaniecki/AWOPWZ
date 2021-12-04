import { DocumentReference } from "firebase/firestore";
import { ITask, IColumn, IProject } from "types/types";
import { ArrayName, CollectionsName } from "utils/utils";
import StoreService from "./StoreService";
import { collectionReferenceProjects, getDocumentReferenceProject } from "utils/references";

export class ProjectService {
  columns?: IColumn[];
  tasks?: ITask[];
  doc: DocumentReference<IProject>;
  constructor({
    tasks,
    columns,
    doc,
  }: {
    tasks?: ITask[];
    columns?: IColumn[];
    doc: DocumentReference<IProject>;
  }) {
    this.columns = columns;
    this.tasks = tasks;
    this.doc = doc;
    if (!this.doc) {
      throw new Error("You need give project doc for constructor class");
    }
  }
  static initNewProject(projectName: string) {
    const data = {
      name: projectName,
      [ArrayName.columns]: [],
      [ArrayName.tasks]: [],
    };
    StoreService.createDoc(data, collectionReferenceProjects);
  }
  static updateProjectName(newProjectName: string, idProject: string) {
    StoreService.updateDoc({ name: newProjectName }, getDocumentReferenceProject(idProject));
  }
  static removeProject(currentUserUid: string, projectName: string, idProject: string) {
    StoreService.removeDoc(StoreService.sync.doc(CollectionsName.projects, idProject));
    const data = {
      name: projectName,
      ref: StoreService.sync.doc(CollectionsName.projects, idProject),
    };
    StoreService.removeArrayElement(
      ArrayName.pinnedProjects,
      [data],
      StoreService.sync.doc(CollectionsName.users, currentUserUid)
    );
  }
  static pinProject(currentUserUid: string, projectName: string, idProject: string) {
    const data = {
      name: projectName,
      ref: StoreService.sync.doc(CollectionsName.projects, idProject),
    };
    StoreService.arrayPush(
      ArrayName.pinnedProjects,
      data,
      StoreService.sync.doc(CollectionsName.users, currentUserUid)
    );
  }
  updateTaskOrder(task: ITask, delta: number = 1) {
    if (!this.columns) {
      throw new Error("You need give columns for constructor class");
    }
    if (task.columnOrder <= this.columns[this.columns.length - 1].order) {
      return task.columnOrder + delta;
    }
    return task.columnOrder;
  }

  moveTask(task: ITask, delta: number = 1) {
    if (!this.columns) {
      throw new Error("You need give columns for constructor class");
    }
    const updatingTask = { ...task };
    updatingTask.columnOrder = this.updateTaskOrder(task, delta);
    if (updatingTask.columnOrder === task.columnOrder) {
      return;
    }
    StoreService.updateArray(ArrayName.tasks, [task], [updatingTask], this.doc);
  }

  updateTasksFromTheColumn(column: IColumn, order: number) {
    if (!this.tasks) {
      throw new Error("You need give tasks for constructor class");
    }
    const oldVersionTasks = this.tasks.filter(({ columnOrder }) => columnOrder === column.order);
    /* typeof order === "number" ? order : task.columnOrder - 1 : co autor miał na myśli(czyli ja), ale działa to nie ruszam */
    const updateTask = (task: ITask) => ({
      ...task,
      columnOrder: order,
    });
    const newVersionTasks = oldVersionTasks.map(updateTask);
    return newVersionTasks;
  }

  async moveTasks(column: IColumn, delta = 1) {
    if (!this.tasks) {
      throw new Error("You need give tasks for constructor class");
    }
    const oldVersionTasks = this.tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = this.updateTasksFromTheColumn(column, delta);
    StoreService.updateArray(ArrayName.tasks, oldVersionTasks, newVersionTasks, this.doc);
  }

  async updateTasks(column: IColumn, delta = 1, doc: DocumentReference<IProject>) {
    if (!this.tasks) {
      throw new Error("You need give tasks for constructor class");
    }
    const oldVersionTasks = this.tasks.filter(({ columnOrder }) => columnOrder === column.order);
    const newVersionTasks = this.updateTasksFromTheColumn(column, delta);
    StoreService.updateArray(ArrayName.tasks, oldVersionTasks, newVersionTasks, doc);
  }

  async moveColumn(column: IColumn, delta: number = 1) {
    if (!this.tasks) {
      throw new Error("You need give tasks for constructor class");
    }
    const newOrder = column.order + delta;
    const checkAreEqualOrder = ({ columnOrder }: ITask) => columnOrder === column.order;
    const oldVersionTasks = this.tasks.filter(checkAreEqualOrder);
    const newVersionTasks = this.updateTasksFromTheColumn(column, newOrder);
    StoreService.updateArray(ArrayName.tasks, oldVersionTasks, newVersionTasks, this.doc);

    return { ...column, order: newOrder };
  }

  async removeColumn(column: IColumn) {
    if (!this.columns) {
      throw new Error("You need give columns for constructor class");
    }
    if (column.order !== 0) {
      this.moveTasks(column, 0);
    }
    const columnsHigherOrder = this.columns.filter(
      ({ order }) => Number(order) > Number(column.order)
    );
    const updateColumnOrder = async (column: IColumn) => await this.moveColumn(column, -1);
    const columnsWithUpdatedOrder = await Promise.all(columnsHigherOrder.map(updateColumnOrder));

    StoreService.updateArray(
      ArrayName.columns,
      [column, ...columnsHigherOrder],
      columnsWithUpdatedOrder,
      this.doc
    );
  }

  async switchColumns(column: IColumn, delta: number = 1) {
    if (!this.columns) {
      throw new Error("You need give columns for constructor class");
    }
    const columnHigherOrder = this.columns.filter(({ order }) => order === column.order + delta)[0];
    const updateColumnHigherOrder = await this.moveColumn(columnHigherOrder, -1 * delta);
    const updateCurrentColumn = await this.moveColumn(column, delta);
    StoreService.updateArray(
      ArrayName.columns,
      [columnHigherOrder, column],
      [updateCurrentColumn, updateColumnHigherOrder],
      this.doc
    );
  }
  getColumnSupport(column: IColumn) {
    return {
      swapWithASmallerOrder: () => this.switchColumns(column, -1),
      swapWithALargerOrder: () => this.switchColumns(column, 1),
      columnRemove: () => this.removeColumn(column),
    };
  }
}
