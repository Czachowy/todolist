import {AppState} from "../../../interfaces/app-state";
import {createSelector} from "@ngrx/store";
import {TaskListState} from "./task-list.state";

export const selectTask = (state: AppState) => state.taskList;

export const tasksSelector = createSelector(
  selectTask,
  state => state.taskList,
);

export const selectLoading = (state: TaskListState) => state.loading;
