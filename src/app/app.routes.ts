import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/task-list/task-list.module').then(m => m.TaskListModule),
  }
];
