import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateTaskDto } from '../create-task/create-task.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditTaskDto } from './edit-task.dto';

@Component({
  selector: 'app-edit-task',
  templateUrl: 'edit-task.component.html',
})
export class EditTaskComponent {
  public id?: number;
  formEdit = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTaskDto,
  ) {
    this.id = this.data.id;
    this.formEdit.patchValue(this.data);
  }

  saveTask() {
    const data = {
      id: this.id,
      title: this.formEdit.get('title')?.value ?? '',
    };
    this.dialogRef.close(data);
  }
}
