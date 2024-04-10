import {ComponentFixture, TestBed} from "@angular/core/testing";
import {StoreModule} from "@ngrx/store";
import {taskListReducer} from "../store/task-list.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TaskListComponent} from "../task-list.component";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {EditTaskDto} from "./edit-task.dto";
import {EditTaskComponent} from "./edit-task.component";

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          taskList: taskListReducer
        }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
      ],
      declarations: [
        EditTaskComponent,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            id: 1,
            title: 'Task title 123',
          } as EditTaskDto
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create edit-task component', () => {
    expect(component).toBeTruthy();
  });

  it('Should not updated task with empty title', () => {
    component.formEdit.get('title')?.setValue('');
    fixture.detectChanges();
    expect(component.formEdit.get('title')?.valid).toBeFalsy();
    expect(component.formEdit.get('title')?.errors).toBeTruthy();
  });

  it('Should updated task because title is not empty', () => {
    component.formEdit.get('title')?.setValue('Test task');
    fixture.detectChanges();
    expect(component.formEdit.get('title')?.valid).toBeTruthy();
    expect(component.formEdit.get('title')?.errors).toBeFalsy();
  });
});
