import {createAction, props} from "@ngrx/store";
import { Task } from "../task";
import {CreateTaskDto} from "../create-task/create-task.dto";
import {EditTaskDto} from "../edit-task/edit-task.dto";
import {TaskListFilterEnum} from "../task-list.filter.enum";

export const filterTaskList = createAction('[TaskList] Filter Tasks', props<{filterType: TaskListFilterEnum}>());

export const loadTaskList = createAction('[TaskList] Load Tasks');
export const loadTaskListSuccess = createAction('[TaskList] Load Tasks Success', props<{taskList: Task[]}>());
export const loadTaskListFailure = createAction('[TaskList] Load Tasks Failure', props<{error: string}>());

export const addTaskList = createAction('[TaskList] Add Task', props<CreateTaskDto>());
export const addTaskListSuccess = createAction('[TaskList] Add Task Success', props<{task: Task}>());
export const addTaskListFailure = createAction('[TaskList] Add Task Failure', props<{error: string}>());

export const updateTaskList = createAction('[TaskList] Update Task', props<{id: number, task: EditTaskDto}>())
export const updateTaskListSuccess = createAction('[TaskList] Update Task Success', props<{id: number, task: Task}>());
export const updateTaskListFailure = createAction('[TaskList] Update Task Failure', props<{error: string}>());

export const deleteListTask = createAction('[TaskList] Delete Task', props<{id: number}>());
export const deleteTaskListSuccess = createAction('[TaskList] Delete Task Success', props<{id: number}>());
export const deleteTaskListFailure = createAction('[TaskList] Delete Task Failure', props<{error: string}>());
