import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskListComponent} from "./task-list.component";
import {RouterModule, Routes} from "@angular/router";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine, MatOption} from "@angular/material/core";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import {taskListReducer} from "./store/task-list.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TaskListEffects} from "./store/task-list.effects";
import {TaskListService} from "./store/task-list.service";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {CreateTaskComponent} from "./create-task/create-task.component";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {EditTaskComponent} from "./edit-task/edit-task.component";
import {DeleteTaskComponent} from "./delete-task/delete-task.component";

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatList,
    MatListItem,
    MatLine,
    MatCheckbox,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatButton,
    StoreModule.forFeature('taskList', taskListReducer),
    EffectsModule.forFeature([TaskListEffects]),
    MatProgressBar,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  declarations: [
    TaskListComponent,
    CreateTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
  ],
  providers: [
    TaskListService,
  ]
})
export class TaskListModule { }
