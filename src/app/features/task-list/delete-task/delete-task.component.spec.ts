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
import {DeleteTaskComponent} from "./delete-task.component";

describe('DeleteTaskComponent', () => {
  let component: DeleteTaskComponent;
  let fixture: ComponentFixture<DeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          taskList: taskListReducer
        }),
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [
        DeleteTaskComponent,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            id: 1,
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create delete-task component', () => {
    expect(component).toBeTruthy();
  });
});
