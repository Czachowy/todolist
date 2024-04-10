import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../interfaces/app-state";
import {MatDialog} from "@angular/material/dialog";
import {TaskListState} from "./store/task-list.state";
import {filter, mergeMap, Observable, pipe, switchMap} from "rxjs";
import {addTaskList, filterTaskList, loadTaskList, updateTaskList, deleteListTask} from "./store/task-list.actions";
import {selectTask} from "./store/task.selector";
import {MatSelectChange} from "@angular/material/select";
import {TaskListFilterEnum} from "./task-list.filter.enum";
import {CreateTaskComponent} from "./create-task/create-task.component";
import {CreateTaskDto} from "./create-task/create-task.dto";
import { Task } from './task';
import {EditTaskComponent} from "./edit-task/edit-task.component";
import {EditTaskDto} from "./edit-task/edit-task.dto";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DeleteTaskComponent} from "./delete-task/delete-task.component";

@Component({
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrl: 'task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<TaskListState>;
  filters = [
    {
      value: TaskListFilterEnum.Default,
      label: 'Wszystkie',
    },
    {
      value: TaskListFilterEnum.Active,
      label: 'Aktywne',
    },
    {
      value: TaskListFilterEnum.Completed,
      label: 'Wykonane',
    },
  ];
  filterBy = TaskListFilterEnum.Default;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.tasks$ = this.store.pipe(
      select(selectTask),
    );
  }

  ngOnInit() {
    this.store.dispatch(loadTaskList());
  }

  showDialogCreateTask(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: {
        title: '',
      } as CreateTaskDto,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createTask(result);
      }
    });
  }

  showDialogEditTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: {
        id: task.id,
        title: task.title,
      } as EditTaskDto,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTask(result.id, {
          id: result.id,
          userId: task.userId,
          completed: task.completed,
          ...result,
        });
      }
    });
  }

  showDialogDeleteTask(task: Task): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: {
        id: task.id
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(result.id);
      }
    });
  }

  createTask(task: CreateTaskDto) {
    this.store.dispatch(addTaskList(task));
  }

  updateTask(id: number, task: EditTaskDto) {
    this.store.dispatch(updateTaskList({id, task}));
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteListTask({id}));
  }

  toggleTask(task: Task, $event: MatCheckboxChange) {
    this.store.dispatch(updateTaskList({
      id: task.id,
      task: {
        ...task,
        completed: $event.checked,
      },
    }));
  }

  onFilterChanged($event: MatSelectChange) {
    this.store.dispatch(filterTaskList({filterType: $event.value as TaskListFilterEnum}));
  }
}
