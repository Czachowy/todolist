import {createReducer, on} from "@ngrx/store";
import {TaskListState} from "./task-list.state";
import * as TaskListActions from "./task-list.actions";
import {TaskListFilterEnum} from "../task-list.filter.enum";
import {updateTaskList} from "./task-list.actions";

export const initialState: TaskListState = {
  loading: true,
  taskList: [],
  taskListFiltered: [],
};

export const taskListReducer = createReducer(
  initialState,
  on(TaskListActions.loadTaskList, state => ({...state, loading: true})),
  on(TaskListActions.loadTaskListSuccess, (state, action) => ({...state, loading: false, taskList: [...action.taskList], taskListFiltered: [...action.taskList]})),
  on(TaskListActions.loadTaskListFailure, (state, {error}) => ({...state, loading: false, error})),
  on(TaskListActions.filterTaskList, (state, { filterType }) => {
    switch (filterType) {
      case TaskListFilterEnum.Active:
        return {
         ...state,
          taskListFiltered: state.taskList.filter(task =>!task.completed)
        };
      case TaskListFilterEnum.Completed:
        return {
         ...state,
          taskListFiltered: state.taskList.filter(task => task.completed)
        };
      default:
        return {
          ...state,
          taskListFiltered: state.taskList
        };
    }
  }),

  on(TaskListActions.addTaskList, (state) => ({
    ...state,
    loading: true
  })),
  on(TaskListActions.addTaskListSuccess, (state, action) => ({
    ...state,
    loading: false,
    taskList: [action.task, ...state.taskList],
    taskListFiltered: [action.task, ...state.taskListFiltered]
  })),
  on(TaskListActions.addTaskListFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  on(TaskListActions.updateTaskList, (state) => ({...state, loading: false})),
  on(TaskListActions.updateTaskListSuccess, (state, action) => ({
    ...state, loading: false,
    taskList: state.taskList.map(task => (task.id === action.task.id? action.task : task)),
    taskListFiltered: state.taskListFiltered.map(task => (task.id === action.task.id? action.task : task)),
  })),
  on(TaskListActions.updateTaskListFailure, (state, {error}) => ({...state, loading: false, error})),

  on(TaskListActions.deleteListTask, (state) => ({...state, loading: false})),
  on(TaskListActions.deleteTaskListSuccess, (state, action) => ({
   ...state, loading: false,
    taskList: state.taskList.filter(task => task.id!== action.id),
    taskListFiltered: state.taskListFiltered.filter(task => task.id!== action.id),
  })),
  on(TaskListActions.deleteTaskListFailure, (state, {error}) => ({...state, loading: false, error})),
)
