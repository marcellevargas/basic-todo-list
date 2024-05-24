export interface Task {
  id?: number;
  title?: string;
  completed?: boolean;
}

export interface State {
  tasks: Task[];
  task: string;
}

export interface Action {
  type: string;
  payload: Task;
}
