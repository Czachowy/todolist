import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TaskListComponent} from "./features/task-list/task-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine, MatOption} from "@angular/material/core";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {StoreModule} from "@ngrx/store";
import {taskListReducer} from "./features/task-list/store/task-list.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TaskListEffects} from "./features/task-list/store/task-list.effects";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {TextFieldModule} from "@angular/cdk/text-field";
import {routes} from "./app.routes";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TaskListModule} from "./features/task-list/task-list.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        TaskListModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
          logOnly: environment.production
        })
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
