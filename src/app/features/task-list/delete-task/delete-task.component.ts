import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateTaskDto} from "../create-task/create-task.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditTaskDto} from "../edit-task/edit-task.dto";

@Component({
  selector: 'app-delete-task',
  templateUrl: 'delete-task.component.html',
})
export class DeleteTaskComponent {
  public id?: number;

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {
    this.id = this.data;
  }

  deleteConfirm() {
    this.dialogRef.close(this.id);
  }
}
