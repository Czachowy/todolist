import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListComponent} from './task-list.component';
import {Task} from './task';
import {Store, StoreModule} from "@ngrx/store";
import {TaskListState} from "./store/task-list.state";
import {loadTaskListSuccess} from "./store/task-list.actions";
import {taskListReducer} from "./store/task-list.reducer";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {CreateTaskComponent} from "./create-task/create-task.component";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: Store<TaskListState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          taskList: taskListReducer
        }),
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatProgressBarModule,
      ],
      declarations: [
        TaskListComponent,
      ]
    })
      .compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create task-list component', () => {
    expect(component).toBeTruthy();
  });

  it('Should display a list of items after data is loaded', () => {
    const tasks: Task[] = [
      {
        id: 1,
        userId: 1,
        title: 'Task 1',
        completed: false,
        date: new Date(),
      },
      {
        id: 2,
        userId: 2,
        title: 'Task 2',
        completed: true,
        date: new Date(),
      }
    ];
    const action = loadTaskListSuccess({taskList: tasks});
    store.dispatch(action);
    component.tasks$.subscribe((taskListState: TaskListState) => {
      expect(taskListState.taskList?.length).toBe(2);
    });
  });

  it('Should have a createTask', () => {
    expect(component.createTask).toBeDefined();
  });

  it('Should have a updateTask', () => {
    expect(component.updateTask).toBeDefined();
  });

  it('Should have a deleteTask', () => {
    expect(component.deleteTask).toBeDefined();
  });
});
