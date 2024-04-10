import { Task } from "../task";

export interface TaskListState {
  loading: boolean;
  taskList: Task[];
  taskListFiltered: Task[];
}
