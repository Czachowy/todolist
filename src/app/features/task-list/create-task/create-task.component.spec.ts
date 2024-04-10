import {CreateTaskComponent} from "./create-task.component";
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
import {CreateTaskDto} from "./create-task.dto";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

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
        CreateTaskComponent,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: '',
          } as CreateTaskDto
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create create-task component', () => {
    expect(component).toBeTruthy();
  });

  it('Should not created task with empty title', () => {
    component.form.get('title')?.setValue('');
    fixture.detectChanges();
    expect(component.form.get('title')?.valid).toBeFalsy();
    expect(component.form.get('title')?.errors).toBeTruthy();
  });

  it('Should created task because title is not empty', () => {
    component.form.get('title')?.setValue('Test task');
    fixture.detectChanges();
    expect(component.form.get('title')?.valid).toBeTruthy();
    expect(component.form.get('title')?.errors).toBeFalsy();
  });
});
