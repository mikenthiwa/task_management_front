import { IUser } from '@/core/common/interfaces/user';

export enum TaskStatus {
  new = 'NEW',
  InProgress = 'InProgress',
  completed = 'Completed',
  onHold = 'OnHold',
  cancelled = 'Cancelled',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: IUser;
  creator: string;
}

export interface IAssignTaskPayload {
  taskId: number;
  assignedId: string;
}

export interface IAssignTaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: {
    id: string;
    username: string;
    email: string;
  };
  creator: {
    id: string;
    username: string;
    email: string;
  };
}
