import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateTaskDto} from "./create-task.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  templateUrl: 'create-task.component.html',
})
export class CreateTaskComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<CreateTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateTaskDto) {
  }

  createTask() {
    const data = {
      title: this.form.get('title')?.value ?? '',
    };
    this.dialogRef.close(data);
  }
}
