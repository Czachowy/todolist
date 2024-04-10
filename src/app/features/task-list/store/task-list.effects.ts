import {Injectable} from "@angular/core";
import {TaskListService} from "./task-list.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as TaskListActions from "./task-list.actions";
import {catchError, delay, filter, map, mergeMap, of, switchMap, tap} from "rxjs";
import { Task } from "../task";
import {CreateTaskDto} from "../create-task/create-task.dto";
import {NotificationService} from "../../../components/notification/notification.service";
import {updateTaskList} from "./task-list.actions";

@Injectable()
export class TaskListEffects {
  loadTaskList$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.loadTaskList),
    switchMap(() => this.taskListService.getTasks().pipe(
      map((taskList: Task[]) => TaskListActions.loadTaskListSuccess({taskList})),
      catchError(error => of(TaskListActions.loadTaskListFailure(error)))
    ))
  ));
  addTaskList$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.addTaskList),
    mergeMap((createTask: CreateTaskDto) => this.taskListService.createTask(createTask).pipe(
      map((task: Task) => {
        this.notificationService.showSuccess('Zadanie zostało utworzone!');
        return TaskListActions.addTaskListSuccess({task});
      }),
      catchError((error) => {
        this.notificationService.showError('Wystąpił błąd podczas tworzenia zadania!');
        return of(TaskListActions.addTaskListFailure({error}));
      })
    ))
  ));
  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.updateTaskList),
    mergeMap(editTask => this.taskListService.updateTask(editTask.id, editTask.task).pipe(
      map((task: Task) => {
        this.notificationService.showSuccess('Zadanie zostało zaktualizowane!');

        return TaskListActions.updateTaskListSuccess({id: editTask.id, task});
      }),
      catchError((error) => {
        this.notificationService.showError('Wystąpił błąd podczas zaktualizowania zadania!');
        return of(TaskListActions.updateTaskListFailure({error}));
      })
    ))
  ));
  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.deleteListTask),
    mergeMap(deleteTask => this.taskListService.deleteTask(deleteTask.id).pipe(
      map((response: any) => {
        this.notificationService.showSuccess('Zadanie zostało usunięte!');
        return TaskListActions.deleteTaskListSuccess({id: deleteTask.id});
      }),
      catchError((error) => {
        this.notificationService.showError('Wystąpił błąd podczas usuwania zadania!');
        return of(TaskListActions.deleteTaskListFailure({error}));
      }),
    ))
  ));

  constructor(private actions$: Actions, private taskListService: TaskListService, private notificationService: NotificationService) {
  }
}
